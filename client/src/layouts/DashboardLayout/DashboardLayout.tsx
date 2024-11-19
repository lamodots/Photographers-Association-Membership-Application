import React, { useState } from "react";
import MemberDashboardSideBar from "../MemberDashboardSideBar/MemberDashboardSideBar";
import TopNavBar from "../TopNavBar/TopNavBar";

function DashboardLayout() {
  const [showSideBar, setShowSideBar] = useState(true);
  const [showMorePopUp, setShowMorePopUp] = useState(false);
  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };
  const togglePopUp = () => {
    setShowMorePopUp(!showMorePopUp);
  };
  return (
    <div className=" flex w-full h-[auto] min-h-screen">
      {showSideBar && <MemberDashboardSideBar />}
      <main className=" bg-[#F5F7FA] max-h-screen overflow-y-scroll w-full">
        <TopNavBar
          handleToggleSideBar={toggleSideBar}
          handlePopUp={togglePopUp}
          showMorePopUp={showMorePopUp}
        />

        <section
          className=" px-8 pb-16"
          onClick={() => setShowMorePopUp(false)}
        >
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. In sit
            temporibus nihil vel vero, velit nemo pariatur cum dolorum dolore?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum
            doloremque nihil, voluptates voluptatibus possimus alias eum
            suscipit esse veniam dicta quae quasi assumenda rerum nemo id sit
            architecto quis ad vitae eius? Nesciunt officiis libero temporibus
            itaque laboriosam. Praesentium eligendi facilis maiores hic
            consequuntur optio cupiditate laboriosam delectus quae nisi, minima
            consequatur omnis eveniet earum possimus ab. Labore error tenetur
            maiores a ratione. Deserunt eaque quo voluptatibus hic amet
            voluptates molestias eius cumque, quisquam officiis adipisci velit.
            Provident error pariatur ad quisquam quia blanditiis quis quo saepe,
            fugit quas quasi omnis et, molestias mollitia, voluptate alias! Id
            quos in quia tempora provident temporibus illum. Inventore,
            temporibus fugiat quasi corporis quos tempore eligendi modi labore!
            Cum, beatae accusantium omnis, dolor maiores odit vel quaerat
            aliquam labore natus enim vero quidem dignissimos tenetur laboriosam
            porro soluta deleniti fugiat dolorum cumque ipsa exercitationem.
            Numquam magni esse deserunt porro labore? Voluptate animi, harum
            enim tempore corporis, doloremque id repellat, in vero facere
            necessitatibus debitis laborum asperiores aliquid at? Autem magni
            excepturi vero placeat ea in nobis sunt quam voluptatem, repellat
            possimus sequi maiores, rem voluptas. Tempore id odit atque natus
            molestias, itaque veniam velit minus vel, deserunt eaque saepe
            repellendus vitae ad explicabo temporibus eos totam quasi harum
            necessitatibus adipisci? Consequuntur, adipisci accusamus quis
            recusandae eius facere sequi neque earum dolores saepe itaque,
            dolorem, eveniet deleniti! Fugit, explicabo delectus a aut modi rem
            ad iure exercitationem deserunt aliquam ipsa architecto amet eum
            tempore, ut recusandae, eveniet voluptatum! Odit ullam veniam
            tempore consequuntur ipsam voluptatem asperiores, repellendus,
            quibusdam ex deserunt, odio inventore dicta magni? Quia rerum,
            reprehenderit excepturi quisquam odio odit necessitatibus libero
            sapiente, eum accusantium provident laboriosam corrupti velit at!
            Assumenda pariatur, voluptatum vero aliquid debitis voluptates
            tenetur sequi placeat facere iusto molestias nemo libero aspernatur
            temporibus. Minus error illo aperiam odio possimus distinctio magni
            temporibus labore beatae architecto, velit, nam voluptates harum
            debitis, sunt eum similique repudiandae molestias dolore doloremque
            suscipit? Impedit ex officiis distinctio mollitia repudiandae esse
            rem, libero sequi architecto, laudantium delectus nihil sapiente
            repellendus ipsum veniam aspernatur magni obcaecati ad. Quidem
            accusantium beatae alias eos ipsam officiis quam consequuntur
            similique debitis fuga, itaque, ipsum quaerat voluptates.
            Voluptatibus veritatis nulla quaerat neque fugit sint amet ea minima
            odit fuga fugiat iste temporibus hic maiores cupiditate alias,
            mollitia ipsam reprehenderit enim magni sed. Nostrum, magnam.
            Aliquam blanditiis dolores, animi fuga quaerat possimus dicta natus
            fugiat doloribus vitae debitis sit sed nisi minima? Lorem ipsum
            dolor, sit amet consectetur adipisicing elit. Consequuntur tempore,
            nisi doloremque officiis id totam, recusandae neque natus facere
            architecto, minus aspernatur mollitia delectus atque aut iusto!
            Soluta neque debitis odio incidunt tenetur expedita excepturi sunt
            aspernatur similique molestiae deleniti ex ipsum perferendis quo
            dolores recusandae, omnis culpa, officia, ipsa veritatis ullam
            exercitationem hic voluptatibus. Repellendus id doloremque nostrum
            atque qui quaerat ut, sed culpa velit, placeat hic ipsum ad itaque
            quae reiciendis, modi nobis fuga assumenda. Asperiores dignissimos,
            expedita nihil voluptates quae ut exercitationem distinctio amet
            sunt repellendus, adipisci accusamus voluptatibus. Repellat
            molestiae maxime impedit mollitia recusandae deleniti, qui quia
            veniam eligendi amet autem minima sunt facilis repellendus pariatur
            id. Fuga nobis commodi voluptatibus tempora doloremque dolorum
            praesentium reiciendis ea, necessitatibus perspiciatis laboriosam ut
            recusandae hic aperiam ullam? Beatae quidem tempora nam cumque
            tenetur fugit soluta exercitationem amet ea quo voluptates dolores
            sit pariatur quaerat iste quam deleniti vero aut ut voluptas hic
            quisquam obcaecati, animi ratione! Voluptas ipsam minima deleniti.
            Alias iusto accusamus minus autem quae. Officia tempora eum quis. A
            mollitia veniam libero deserunt corporis dicta voluptatem sequi quam
            cumque quidem dignissimos dolorem quasi animi tenetur vel officia,
            exercitationem, minus earum facere esse? Dicta et quae voluptate
            sapiente nemo veritatis illum, iure voluptatem est. Iure ipsam
            corrupti blanditiis repellendus sequi praesentium autem odio non
            iste ea a, deserunt rerum eum unde labore ab dignissimos in dolor
            temporibus? Provident eum cumque rerum quisquam unde? Nesciunt,
            debitis molestiae sequi eveniet quasi magni. Id corporis deserunt
            perspiciatis odio ut, minus itaque autem natus laborum iusto rerum
            recusandae. Pariatur, saepe accusamus officia unde accusantium,
            nostrum sed nisi necessitatibus omnis doloribus modi illum nihil.
            Ipsum doloribus ipsa repudiandae dolore odio assumenda nesciunt
            delectus omnis minima, vero vel sapiente perspiciatis qui nulla
            natus ullam quasi dolorum eaque laborum? Similique labore ex quod
            optio nesciunt hic autem ea quidem commodi exercitationem! Omnis
            deserunt commodi vero maxime. Ratione, temporibus, ut corporis
            officiis nesciunt odio totam maiores repudiandae at consectetur est
            enim earum ducimus nostrum perspiciatis suscipit consequatur culpa!
            Minus quia magnam quasi porro aliquid fugit vero, optio delectus
            beatae numquam molestiae officiis nesciunt doloremque cupiditate.
            Et, asperiores enim? Voluptate nobis dicta repudiandae maxime!
            Cupiditate in nam cumque quod deserunt qui sunt, recusandae officia
            aperiam, commodi earum culpa harum laboriosam reiciendis voluptas
            placeat unde inventore asperiores labore quibusdam aspernatur?
            Repellendus sunt vero molestiae est unde cupiditate aperiam,
            consequatur, quaerat saepe, necessitatibus quam commodi dolorum
            nihil incidunt. Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Porro voluptates ab amet recusandae culpa ex veniam expedita
            eligendi. A veniam neque temporibus magnam ipsum maiores at eligendi
            id architecto. Distinctio, consequuntur sequi, officia nostrum
            minima laboriosam exercitationem ducimus iure nobis rem quaerat vero
            quod ut, eum consequatur nisi laudantium! Obcaecati nobis dolor
            quidem, unde impedit numquam ad dolorem repellat sequi voluptas
            tenetur eos provident accusantium alias nulla, maiores tempore
            architecto ducimus aliquid blanditiis atque sapiente quod aspernatur
            nam? Deleniti quaerat dolores tempora, unde culpa eligendi expedita
            voluptatem, aut dignissimos impedit eum. Quae dolorum dolores
            doloremque in mollitia inventore dolore, optio laboriosam facere
            fuga eaque minima nobis rem iste maxime rerum recusandae quod
            repellat architecto veritatis ducimus pariatur eius. Temporibus
            provident, vero optio facilis voluptates debitis, excepturi, quo
            necessitatibus nihil aperiam est quod recusandae porro. Iusto
            delectus aliquam laboriosam maxime officiis. Est omnis laborum
            distinctio tempore quibusdam earum, pariatur maxime fugit ducimus
            praesentium soluta accusantium porro quas mollitia provident cumque
            error consectetur perspiciatis explicabo quisquam optio laudantium
            harum sint. Laudantium non repellat cupiditate optio mollitia qui
            iure commodi neque, excepturi quasi! Omnis non sed facere rem
            corrupti accusantium debitis repudiandae dicta. Dolores doloribus
            consectetur reprehenderit iure ipsam fuga dolorem quisquam laborum
            facere, aut voluptatibus perspiciatis sunt esse in, tempora animi
            tempore quo! Quia rem excepturi voluptates aliquam aperiam et
            assumenda necessitatibus reprehenderit adipisci, illo, quas
            molestiae? Doloribus aspernatur autem incidunt, culpa vero facere
            debitis saepe in! Sunt, eum veniam repellendus, assumenda voluptatem
            beatae dolorem eos quae ipsam fuga soluta provident vel dignissimos
            vero perferendis. Corporis quas magnam quasi tenetur dolor sapiente,
            assumenda recusandae dolore cum. Iure ratione quas aperiam culpa
            quia neque inventore tenetur praesentium soluta accusantium? Esse
            voluptate nostrum beatae minima fuga obcaecati, ratione
            reprehenderit iure, porro cupiditate dignissimos eligendi dicta
            recusandae expedita aspernatur neque ipsum soluta sint veritatis
            sapiente dolorum repudiandae cum suscipit. Laudantium iste eveniet
            delectus vero consequatur molestiae error perspiciatis vel amet cum
            expedita non maxime ipsa, sequi soluta asperiores suscipit quidem
            impedit deleniti illo! Officiis repellendus nulla doloremque,
            inventore nesciunt voluptatem? Pariatur sit odio doloremque. Quas
            delectus voluptatum nulla suscipit eius perferendis. Repudiandae,
            ad? Quisquam quis animi nemo, nisi tenetur, enim provident
            voluptates quaerat quae eum neque beatae consequuntur aliquid
            assumenda, laudantium porro numquam dolor quam eveniet repellat.
            Illo, esse? Exercitationem provident impedit quasi asperiores id rem
            distinctio? Corrupti atque et dolor repudiandae minima dolorem sunt
            facilis veritatis, consequuntur voluptatibus suscipit quod est totam
            aut quisquam!
          </p>
        </section>
      </main>
    </div>
  );
}

export default DashboardLayout;
