const { StatusCodes } = require("http-status-codes");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
const { Parser } = require("@json2csv/plainjs");
const { User, WelfareDues, MembershipDues } = require("../../models");

/**
 * Get all users with their complete profiles including welfare and membership data
 * @route GET /api/users
 */
const getAllUsers = async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filter parameters
    const { search, membershipStatus, welfareStatus, membershipType } =
      req.query;

    // Base query - exclude admin and moderator roles
    let query = {
      role: { $nin: ["admin", "moderator"] },
    };

    // Apply search filter if provided
    if (search) {
      query.$or = [
        { firstname: { $regex: search, $options: "i" } },
        { lastname: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { memberId: { $regex: search, $options: "i" } },
      ];
    }

    // Apply membership type filter if provided
    if (membershipType) {
      query.membershipType = membershipType;
    }

    // Get total count for pagination
    const totalUsers = await User.countDocuments(query);

    // Get users with pagination
    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get user IDs for batch processing
    const userIds = users.map((user) => user._id);

    // Get all welfare dues for these users
    const allWelfareDues = await WelfareDues.find({
      userId: { $in: userIds },
    }).sort({ expiryDate: -1 });

    // Get all membership dues for these users
    const allMembershipDues = await MembershipDues.find({
      userId: { $in: userIds },
    }).sort({ expiryDate: -1 });

    // Create maps for welfare and membership data by user
    const welfareMap = new Map();
    allWelfareDues.forEach((welfare) => {
      const userId = welfare.userId.toString();
      if (!welfareMap.has(userId)) {
        welfareMap.set(userId, []);
      }
      welfareMap.get(userId).push(welfare);
    });

    const membershipMap = new Map();
    allMembershipDues.forEach((membership) => {
      const userId = membership.userId.toString();
      if (!membershipMap.has(userId)) {
        membershipMap.set(userId, []);
      }
      membershipMap.get(userId).push(membership);
    });

    // Filter users if welfare or membership status filters are applied
    let filteredUsers = users;
    if (membershipStatus || welfareStatus) {
      filteredUsers = users.filter((user) => {
        const userId = user._id.toString();
        const userMemberships = membershipMap.get(userId) || [];
        const userWelfares = welfareMap.get(userId) || [];

        // Get the most recent membership and welfare
        const currentMembership = userMemberships[0];
        const currentWelfare = userWelfares[0];

        // Check membership status if filter is applied
        if (
          membershipStatus &&
          (!currentMembership || currentMembership.status !== membershipStatus)
        ) {
          return false;
        }

        // Check welfare status if filter is applied
        if (
          welfareStatus &&
          (!currentWelfare || currentWelfare.status !== welfareStatus)
        ) {
          return false;
        }

        return true;
      });
    }

    // Format the response with comprehensive user data
    const completeUserData = filteredUsers.map((user) => {
      const userId = user._id.toString();
      const userWelfares = welfareMap.get(userId) || [];
      const userMemberships = membershipMap.get(userId) || [];

      // Get current (most recent) welfare and membership
      const currentWelfare = userWelfares.length > 0 ? userWelfares[0] : null;
      const currentMembership =
        userMemberships.length > 0 ? userMemberships[0] : null;

      return {
        // Basic user information
        _id: user._id,
        fullName: `${user.firstname || ""} ${user.lastname || ""}`.trim(),
        email: user.email,
        whatsappId: user.whatsappId,
        image: user.image,
        title: user.title,
        gender: user.gender,
        bloodgroup: user.bloodgroup,
        dateOfBirth: user.Dob,
        location: user.location,
        address: user.address,
        aboutUser: user.aboutuser,
        social: user.social,
        interests: user.interest,
        profession: user.profession,
        membershipType: user.membershipType,
        isHonouraryMember: user.isHonouraryMember,
        memberId: user.memberId,
        dateOfEntry: user.dateOfEntry,

        // India specific information
        emergencyContactInIndia: user.emergencyContactInIndia,
        districtInIndia: user.districtInIndia,
        statesInIndia: user.statesInIndia,
        addressInIndia: user.addressInIndia,

        // Family information
        familyInLagos: user.familyInLagos,
        familyMembers: user.familyMembers,

        // Account info
        role: user.role,
        isVerified: user.isVerified,
        isOnboarded: user.isOnboarded,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,

        // Current welfare status
        currentWelfare: currentWelfare
          ? {
              _id: currentWelfare._id,
              amount: currentWelfare.amount,
              startDate: currentWelfare.startDate,
              expiryDate: currentWelfare.expiryDate,
              year: currentWelfare.year,
              status: currentWelfare.status,
              isWelfareDuePaid: currentWelfare.isWelfareDuePaid,
              paymentMethod: currentWelfare.paymentMethod,
              paymentReference: currentWelfare.paymentReference,
              paymentDate: currentWelfare.paymentDate,
              channel: currentWelfare.channel,
              account_name: currentWelfare.account_name,
              bank: currentWelfare.bank,
            }
          : null,

        // Current membership status
        currentMembership: currentMembership
          ? {
              _id: currentMembership._id,
              membershipType: currentMembership.membershipType,
              amount: currentMembership.amount,
              startDate: currentMembership.startDate,
              expiryDate: currentMembership.expiryDate,
              year: currentMembership.year,
              status: currentMembership.status,
              isMemberShipDuePaid: currentMembership.isMemberShipDuePaid,
              paymentMethod: currentMembership.paymentMethod,
              paymentReference: currentMembership.paymentReference,
              paymentDate: currentMembership.paymentDate,
              channel: currentMembership.channel,
              account_name: currentMembership.account_name,
              bank: currentMembership.bank,
            }
          : null,

        // All welfare records
        welfareHistory: userWelfares.map((welfare) => ({
          _id: welfare._id,
          amount: welfare.amount,
          startDate: welfare.startDate,
          expiryDate: welfare.expiryDate,
          year: welfare.year,
          status: welfare.status,
          isWelfareDuePaid: welfare.isWelfareDuePaid,
          paymentMethod: welfare.paymentMethod,
          paymentReference: welfare.paymentReference,
          paymentDate: welfare.paymentDate,
          channel: welfare.channel,
          account_name: welfare.account_name,
          bank: welfare.bank,
        })),

        // All membership records
        membershipHistory: userMemberships.map((membership) => ({
          _id: membership._id,
          membershipType: membership.membershipType,
          amount: membership.amount,
          startDate: membership.startDate,
          expiryDate: membership.expiryDate,
          year: membership.year,
          status: membership.status,
          isMemberShipDuePaid: membership.isMemberShipDuePaid,
          paymentMethod: membership.paymentMethod,
          paymentReference: membership.paymentReference,
          paymentDate: membership.paymentDate,
          channel: membership.channel,
          account_name: membership.account_name,
          bank: membership.bank,
        })),
      };
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      count: completeUserData.length,
      totalUsers,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      users: completeUserData,
    });
  } catch (error) {
    console.error("Error fetching users with complete data:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to retrieve users with complete data",
      error: error.message,
    });
  }
};

const exportUsersController = async (req, res) => {
  try {
    // Step 1: Fetch data from MongoDB
    const data = await User.find();

    // Step 2: Convert data to CSV
    const fields = [
      "firstname",
      "lastname",
      "memberId",
      "location",
      "whatsappId",
      "email",
    ];
    const parser = new Parser({ fields });
    const csv = parser.parse(data);

    // Step 3: Save CSV to a temporary file
    const filePath = path.join(__dirname, "data.csv");
    fs.writeFileSync(filePath, csv);

    // Step 4: Upload the file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw", // Ensure Cloudinary treats it as a raw file
      public_id: "data", // Optional: Set a custom public ID
      folder: "lasppan-folder/exported-data",
    });

    // Step 5: Delete the temporary file
    fs.unlinkSync(filePath);

    // Step 6: Send the Cloudinary URL back to the client
    res.json({ fileUrl: uploadResult.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating or uploading file");
  }
};
module.exports = {
  getAllUsers,
  exportUsersController,
};
