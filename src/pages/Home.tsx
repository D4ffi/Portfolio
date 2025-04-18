import HeroSection from "../components/hero/HeroSection.tsx";
import Layout from "../components/common/Layout.tsx";

function Home() {

    return (
      <div className={"bg-neutral-200 dark:bg-violet-dark-darker"}>
          <Layout title="Home">
              <HeroSection/>

              <br/>

                <div className="container mx-auto">
                    <h1 className="text-3xl font-bold">Welcome to Koss</h1>
                    <p className="text-lg">This is a starter template for Vite + React + TailwindCSS projects.</p>
                </div>

          </Layout>
      </div>
    );

}

export default Home;