import {createDirectus, readItems} from "@directus/sdk";
import {rest} from '@directus/sdk/rest';
import Section from "@/components/sections/section";
import HeroBlock from "@/components/sections/hero_block/hero_block";
import React from "react";
import SkillBlock from "@/components/sections/skill_block/skill_block";
import HeroBlockType from "@/types/hero_block";
import SkillBlockType from "@/types/skill_block";
import ExperienceBlockType from "@/types/experience_block";
import ExperienceBlock from "@/components/sections/experience_block/experience_block";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

const client = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_URL!).with(rest());

interface HomeProps {
    heroBlock: HeroBlockType;
    experienceBlock: ExperienceBlockType;
    skillsBlock: SkillBlockType;
    links: string[];
    logo: string;
}

const Home = ({links, logo, heroBlock, skillsBlock, experienceBlock}: HomeProps) => {

    return (
        <>

            <Navbar
                links={links}
                logo={logo}
            />
            {heroBlock &&
                <Section id={heroBlock.link}>
                    <HeroBlock heroBlock={heroBlock}/>
                </Section>
            }
            {experienceBlock &&
                <Section id={experienceBlock.link}>
                    <ExperienceBlock experienceBlock={experienceBlock}/>
                </Section>
            }
            {skillsBlock &&
                <Section id={skillsBlock.Link}>
                    <SkillBlock skillsBlock={skillsBlock}/>
                </Section>
            }

            <Footer links={links}/>
        </>
    )
}

export async function getServerSideProps() {

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

    return {
        props: {
            heroBlock: heroBlock,
            experienceBlock: experienceBlock,
            //skillsBlock: homePageContent.Sections[2].item as unknown as SkillBlockType,
            links: [heroBlock.link, experienceBlock.link],
            logo: heroBlock.logo,
        },
    };
}


export default Home