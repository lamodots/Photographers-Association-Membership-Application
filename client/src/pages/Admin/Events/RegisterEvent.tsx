import React, { useState, ChangeEvent, FormEvent } from "react";
import TextInput from "../../../components/Input/TextInput";
import Lable from "../../../components/Lable/Lable";
import Button from "../../../components/Button/Button";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { useLocation, useParams } from "react-router-dom";
import { dateFormater } from "../../../util/DateFormater";
import { Calendar, Locate } from "lucide-react";

const API_URL = process.env.REACT_APP_CLIENT_URL;
// Define types for form values and attendees
interface FormValues {
  fullname: string;
  email: string;
  phone: string;
  whatsappphone: string;
  number: string;
}

interface Attendee {
  id: number;
  name: string;
}

function RegisterEvent() {
  const [attendees, setAttendees] = useState<Attendee[]>([
    { id: Date.now(), name: "" },
  ]);
  const [formValues, setFormValues] = useState<FormValues>({
    fullname: "",
    email: "",
    phone: "",
    whatsappphone: "",
    number: "1",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id: eventId } = useParams();
  const location = useLocation();
  const { annoucementData: eventData } = location.state;
  console.log("i am the hehehehehehe", eventData);

  // Handle changes in form inputs
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle changes in attendee names
  const handleAttendeeChange = (id: number, value: string): void => {
    setAttendees((prevAttendees) =>
      prevAttendees.map((attendee) =>
        attendee.id === id ? { ...attendee, name: value } : attendee
      )
    );
  };

  // Add a new attendee
  const addAttendee = (): void => {
    const newAttendee = { id: Date.now(), name: "" };
    setAttendees([...attendees, newAttendee]);
  };

  // Remove an attendee
  const removeAttendee = (id: number): void => {
    const updatedAttendees = attendees.filter((attendee) => attendee.id !== id);
    setAttendees(updatedAttendees);
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const attendeeCount = parseInt(formValues.number || "0", 10);

      if (attendees.length !== attendeeCount) {
        toast.error(
          "Number of attendees does not match the number of attendee names provided."
        );
        return;
      }

      for (const attendee of attendees) {
        if (!attendee.name.trim()) {
          toast.error("Please fill in all attendee names.");
          return;
        }
      }

      // Example form submission logic
      // const formData = {
      //   ...formValues,
      //   attendees: attendees.map((attendee) => attendee.name),
      // };

      const formData = {
        full_name: formValues.fullname,
        email: formValues.email,
        phone_number: formValues.phone,
        whatsapp_number: formValues.whatsappphone,
        number_of_family_members: formValues.number,

        attendees: attendees.map((attendee) => ({
          attendee_full_name: attendee.name,
        })),

        event: eventId,
      };

      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const res = await fetch(`${API_URL}/api/v1/secure/events/applicants`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const result = await res.json();
      if (res.ok) {
        console.log("Form submitted:", formData);
        toast.success("Registration successful!, check your email");
      } else {
        toast.error(result.error || "An error occurred during registration.");
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-zinc-50 rounded-lg shadow-sm font-sans">
      <header className="mb-8">
        <div className="h-[360px] flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 rounded-lg to-pink-500 mb-6">
          <img
            className=" rounded-lg  w-full max-w-[940px] h-full"
            src={`../../../uploads/${eventData?.photoImage}`}
            alt={eventData.title}
          />
        </div>
        <small className="font-semibold">
          {dateFormater(eventData.startDate)}
        </small>
        <h1 className="text-4xl font-bold mb-4 text-shark-950 capitalize">
          {eventData.title}
        </h1>
        <div className="mb-2">
          <h3 className="text-xl font-bold text-shark-950">Date and Time</h3>
          <div className="flex items-center gap-4 mt-2">
            <Calendar />
            <div>
              <strong className="font-medium text-shark-600">
                {dateFormater(eventData.startDate)}
              </strong>
              -
              <span className="font-medium text-shark-600">
                {eventData.time}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-2 mt-6">
          <h3 className="text-xl font-bold text-shark-950">Location</h3>
          <div className="flex items-center gap-4 mt-2">
            <Locate />
            <div>
              <span className="font-medium text-shark-600">
                {eventData.venue}
              </span>
            </div>
          </div>
        </div>
        <h3 className="text-xl font-bold text-shark-950">About this event</h3>
        <p className="text-shark-600">{eventData.description}</p>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <section className="py-8 space-y-6">
            <h3 className="text-xl font-bold text-shark-950">
              Personal Information
            </h3>
            <div className="mb-4 flex flex-col gap-2">
              <Lable label="Full name" />
              <TextInput
                type="text"
                name="fullname"
                placeholderText="Enter Full name"
                value={formValues.fullname}
                handleInputChange={handleInputChange}
              />
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <Lable label="Email Address" />
              <TextInput
                type="email"
                name="email"
                placeholderText="Enter Email"
                value={formValues.email}
                handleInputChange={handleInputChange}
              />
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <Lable label="Phone Number" />
              <TextInput
                type="text"
                name="phone"
                placeholderText="Enter Phone Number"
                value={formValues.phone}
                handleInputChange={handleInputChange}
              />
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <Lable label="WhatsApp Number" />
              <TextInput
                type="text"
                name="whatsappphone"
                placeholder="Enter WhatsApp Number"
                value={formValues.whatsappphone}
                handleInputChange={handleInputChange}
              />
            </div>
          </section>

          {/* Attendee Information */}
          <section className="space-y-6 mb-8">
            <h3 className="text-xl font-bold text-shark-800">
              Attendee Information
            </h3>
            <div className="mb-4 flex flex-col gap-2">
              <Lable label="Number of people attending from your family should be 0 if none" />
              <TextInput
                type="number"
                name="number"
                value={formValues.number}
                handleInputChange={(e) => {
                  const value = Math.max(0, parseInt(e.target.value, 10)); // Prevent negative values
                  setFormValues({ ...formValues, number: value.toString() });
                }}
              />
            </div>
            <div className="space-y-6">
              {attendees.map((attendee) => (
                <div key={attendee.id} className="flex items-center gap-4">
                  <TextInput
                    type="text"
                    name={`attendee-${attendee.id}`} // Use attendee.id for a unique name
                    placeholderText="Add Attendee Name"
                    value={attendee.name}
                    handleInputChange={
                      (e) => handleAttendeeChange(attendee.id, e.target.value) // Use handleAttendeeChange
                    }
                    className="w-1/2"
                  />
                  <Button
                    text="Remove"
                    type="button"
                    handleClick={() => removeAttendee(attendee.id)}
                    className="px-8 text-white"
                  />
                </div>
              ))}
              <Button
                text="Add"
                type="button"
                handleClick={addAttendee}
                className="px-8 py-2 text-white"
              />
            </div>
          </section>

          <Button
            text="Complete"
            isSubmitting={isSubmitting}
            disableBtn={isSubmitting}
            className="px-8 text-white w-1/2"
          >
            {isSubmitting && (
              <Oval
                visible={true}
                height="24"
                width="24"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            )}
          </Button>
        </form>
      </main>
    </div>
  );
}

export default RegisterEvent;
