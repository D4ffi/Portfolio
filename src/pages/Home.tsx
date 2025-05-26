import HeroSection from "../components/hero/HeroSection.tsx";
import Layout from "../components/common/Layout.tsx";
import LanguageCard from "../components/common/LanguageCard.tsx";
import ProjectCard from "../components/common/ProjectCard.tsx";
import dashboard from '../assets/sesa/dashboard.png';
import dashboard1 from '../assets/sesa/dashboard1.png';
import dashboard2 from '../assets/sesa/dashboard2.png';
import dashboard3 from '../assets/sesa/dashboard3.png';
function Home() {

    return (
      <div className={"bg-neutral-200 dark:bg-violet-grey"}>
          <Layout title="Home">

              <section id="hero">
                  <HeroSection/>
              </section>

              <section id="about" className={"dark:bg-gradient-to-b from-violet-dark to-violet-grey"}>
                  <div className="flex flex-col items-center justify-center text-center dark:text-tropical-indigo">
                      <h1 className="text-4xl font-bold">A little about me</h1>
                      <p className="text-lg w-1/3 text-balance pt-4">I started this journey as a software developer because of Minecraft!
                          Creating modpacks, editing configs, making datapacks,
                          and even developing my own mod with Java—the rest is history.
                          Now, I'm on this software development path, and I love it,
                          from planning and developing to publishing.</p>

                      <a className={"items-end pt-8  pl-100 justify-end text-end hover:underline"} href="https://google.com">See my Mod dev page --{">"}</a>

                      <h2 className={"text-4xl font-bold pt-30"}>Tech Stack & Tools</h2>

                      <p className="text-lg w-1/3 text-balance pt-4">I have experience with a variety of technologies and tools,
                            including Java, JavaScript, TypeScript, React, Node.js, Express,
                            MongoDB, PostgreSQL, and more. I also have experience with
                            cloud platforms like AWS and GCP.</p>

                      <div className={"flex flex-row justify-center items-center pt-10"}>
                          <LanguageCard imagePath={"nodejs.svg"} name={"Node JS"}/>
                          <LanguageCard imagePath={"javascript.svg"} name={"Javascript"}/>
                          <LanguageCard imagePath={"typescript.svg"} name={"Typescript"}/>
                          <LanguageCard imagePath={"react.svg"} name={"React"}/>
                          <LanguageCard imagePath={"tailwind.svg"} name={"Tailwind CSS"}/>
                          <LanguageCard imagePath={"csharp.png"} name={"C Sharp"}/>
                      </div>

                      <div className={"flex flex-row justify-center items-center pt-10"}>
                          <LanguageCard imagePath={"java.svg"} name={"Java"}/>
                          <LanguageCard imagePath={"spring.svg"} name={"Spring"}/>
                          <LanguageCard imagePath={"angular.svg"} name={"Angular"}/>
                          <LanguageCard imagePath={"rust.svg"} name={"Rust"}/>
                          <LanguageCard imagePath={"tauri.svg"} name={"tauri"}/>
                          <LanguageCard imagePath={"dotnet.svg"} name={".Net"}/>
                      </div>

                  </div>
              </section>

              <section id={"projects"}>

                  <div className={"flex flex-col items-center pt-60 justify-center text-center dark:text-tropical-indigo"}>
                      <h1 className="text-4xl font-bold text-center dark:text-tropical-indigo pb-30">Projects</h1>

                      <ProjectCard
                          images={[dashboard1, dashboard, dashboard2, dashboard3]}
                          title={"Inventory Management Software"}
                          description={"This project is an inventory manager created for Sesa Promo, a company based in Monterrey that specializes in the sale of promotional products. The solution includes a way to register and manage products, categories, and organize stock across the different warehouses the company has, with the ability to create or edit them."}
                          technologies={['TypeScript','React','TailwindCSS','Supabase']}
                      />
                  </div>

              </section>

              <br/>



              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>

          </Layout>
      </div>
    );

}

export default Home;