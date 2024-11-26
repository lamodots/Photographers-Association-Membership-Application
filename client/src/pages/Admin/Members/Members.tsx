import { Filter } from "lucide-react";
import React, { useState } from "react";
import TextInput from "../../../components/Input/TextInput";
import NewMemberCard from "../../../components/Admin-Components/NewMemberCard/NewMemberCard";
import { FAKE_MEMBERS } from "../../../util/data";

function Members() {
  const [userData, setUserData] = useState(FAKE_MEMBERS);
  const [text, setText] = useState("");
  const [showPopup, setShowPopUp] = useState(false);

  return (
    <main>
      <header>
        <h1 className="text-2xl text-[#212529] font-bold">
          LASPPAN Memebers List
        </h1>
        <div className="flex  justify-between items-center gap-4 w-full max-w-[600px] mt-8">
          <div className="left w-full">
            <TextInput
              className=" w-full"
              type="text"
              placeholderText="Search member"
              name=""
              value={""}
              handleInputChange={(e) => setText(e.target.value)}
            />
          </div>
          {/* the popup */}
          <div>
            <div
              className="right py-3 px-2 bg-white rounded-lg shadow-lg flex items-center justify-center cursor-pointer"
              onClick={() => setShowPopUp(!showPopup)}
            >
              <Filter />
              <small>Filter</small>
            </div>

            {showPopup && (
              <div className=" relative z-50">
                <ul className="absolute right-1 rounded-lg bg-white p-6 w-[162px] mt-1 flex flex-col gap-6">
                  <li
                    className="text-sm cursor-pointer"
                    onClick={() => setShowPopUp(!showPopup)}
                  >
                    Normal Memeber{" "}
                  </li>
                  <li
                    className="text-sm cursor-pointer"
                    onClick={() => setShowPopUp(!showPopup)}
                  >
                    Life time Member
                  </li>
                  <li
                    className="text-sm cursor-pointer"
                    onClick={() => setShowPopUp(!showPopup)}
                  >
                    Honary members
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* the popup end */}
        </div>
      </header>
      <section className="py-8">
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3">
          {userData.map((user) => {
            return (
              <React.Fragment key={user.id}>
                <NewMemberCard
                  name={user.name}
                  image={user.photo}
                  email={user.email}
                />
              </React.Fragment>
            );
          })}
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
          repudiandae totam ipsum esse, magnam deleniti consequatur unde alias
          rem harum? Laborum aspernatur earum perferendis. Similique quaerat
          nulla error animi aliquam odio dignissimos nisi ipsum facilis! Ducimus
          dicta nam blanditiis quae dolorum, corporis, quas deleniti dolorem
          itaque soluta, molestiae magnam at excepturi assumenda consequuntur
          impedit sequi odit rerum accusamus. Expedita rerum laudantium soluta
          dolores porro suscipit, laboriosam blanditiis accusamus nulla minima
          doloremque voluptatibus aspernatur vitae asperiores similique
          recusandae. Fugit consectetur cum corporis et consequuntur qui magni
          consequatur molestiae, temporibus saepe in officiis laborum minima
          fugiat, voluptas explicabo hic veniam eos, tenetur reiciendis! Quae
          recusandae, earum delectus ducimus at a beatae non architecto quidem
          ipsa eveniet perferendis laboriosam iusto reprehenderit commodi
          praesentium rerum, quisquam facere quibusdam, distinctio voluptas qui
          debitis sunt expedita? Quaerat rem repellat quibusdam fuga, quisquam
          omnis labore aliquam modi id deserunt nostrum voluptatibus
          necessitatibus ullam deleniti magni aliquid doloribus excepturi nihil?
          At ab numquam a perspiciatis blanditiis sit iure neque! Alias
          blanditiis cumque id aspernatur consequuntur expedita autem, voluptas
          doloremque nulla, temporibus est debitis dignissimos explicabo velit
          laboriosam voluptates facilis ipsum similique aliquam. Alias eligendi
          dolor magnam fuga rerum voluptate consectetur quae magni pariatur eos
          sed quis obcaecati architecto, est, reprehenderit quam natus sit
          voluptates aliquam. Est quaerat asperiores ullam, soluta amet
          similique possimus libero eos totam porro ad consequatur quia delectus
          atque placeat eligendi voluptatibus, quidem dolorem? Asperiores, a ab
          culpa officia impedit quidem consectetur deserunt in perspiciatis
          natus iure, aliquam nesciunt fugit quis distinctio perferendis
          molestiae numquam quisquam rerum quasi. Optio molestiae quam officia,
          odio ipsam reprehenderit dolores quaerat facere et, beatae quibusdam
          atque laudantium sunt, eum iusto at accusamus eveniet. Fuga, ut!
          Deserunt laboriosam recusandae, dolor distinctio eveniet minus vel,
          laudantium dignissimos voluptatum vero corrupti quas iusto voluptatem
          cum consectetur, placeat ipsa. Deserunt consequuntur quae sit nesciunt
          nemo libero accusamus animi amet est? Quos magnam, assumenda itaque
          quaerat rerum eum dolorem et. Totam ad, qui itaque sit illum obcaecati
          incidunt aliquid? Voluptatum fugiat distinctio consequuntur at aperiam
          deleniti quidem soluta nulla sit, inventore molestias fugit
          exercitationem excepturi rem consequatur similique alias dolor
          nesciunt harum ab eos repellat accusamus eveniet. Vero, omnis est.
          Mollitia delectus qui eveniet, quas optio earum laudantium porro fugit
          temporibus, a quasi! Laborum pariatur est assumenda alias ut nisi,
          corrupti possimus neque perferendis totam beatae sed quas rem
          molestiae quasi a quae tempora harum aut consequatur. Similique fugiat
          mollitia ratione saepe vel est?
        </p>
      </section>
    </main>
  );
}

export default Members;
