import {createDirectus, readItems, rest} from "@directus/sdk";
import HeroBlockType from "@/types/hero_block";
import ExperienceBlockType from "@/types/experience_block";
import NavbarMobile from "@/Components/navbar/navbarMobile";
import Navbar from "@/Components/navbar/navbar";
import Section from "@/Components/section";
import HeroBlock from "@/Components/hero";

const client = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_URL!).with(rest());

async function Home() {
    const heroBlock = await client.request(
        readItems('hero_block', {
            fields: ['*', {}],
        })
    ) as unknown as HeroBlockType;

    const experienceBlock = await client.request(
        readItems('experience_block', {
            fields: ['*', {
                experiences: ['*', {}]
            }],
        })
    ) as unknown as ExperienceBlockType;

    const links = [heroBlock.link, experienceBlock.link];
    const logo = heroBlock.logo;

    return (
        <>
            <div className={'bg-background px-8 md:px-24 2xl:px-64'}>
                <NavbarMobile
                    links={links}
                    logo={logo}
                />
                <Navbar
                    links={links}
                    logo={logo}
                />
                <Section id={heroBlock.link}>
                    <HeroBlock heroBlock={heroBlock}/>
                </Section>
            </div>
        </>
    );
}

export default Home;