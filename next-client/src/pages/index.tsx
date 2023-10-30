import {createDirectus, readItems} from "@directus/sdk";
import {rest} from '@directus/sdk/rest';
import Section from "@/components/sections/section";
import HeroBlock from "@/components/sections/hero_block/hero_block";
import React from "react";
import SkillBlock from "@/components/sections/skill_block/skill_block";
import HomepageContent from "@/types/homepage_content";
import HeroBlockType from "@/types/hero_block";
import SkillBlockType from "@/types/skill_block";
import ExperienceBlockType from "@/types/experience_block";
import ExperienceBlock from "@/components/sections/experience_block/experience_block";

const client = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_URL!).with(rest());

interface HomeProps {
    heroBlock: HeroBlockType;
    experienceBlock: ExperienceBlockType;
    skillsBlock: SkillBlockType;
    links: string[];
    logo: string;
}

const Home = ({heroBlock, skillsBlock, experienceBlock}: HomeProps) => {

    console.log(experienceBlock)

    return (
        <>
            {heroBlock &&
                <Section id={heroBlock.Link}>
                    <HeroBlock heroBlock={heroBlock}/>
                </Section>
            }
            {experienceBlock &&
                <Section id={experienceBlock.Link}>
                    <ExperienceBlock experienceBlock={experienceBlock}/>
                </Section>
            }
            {skillsBlock &&
                <Section id={skillsBlock.Link}>
                    <SkillBlock skillsBlock={skillsBlock}/>
                </Section>
            }
        </>
    )
}

export async function getServerSideProps() {

    const homePageContent = await client.request(
        readItems('homepage_content', {
            fields: ['*', {
                Sections: ['*', {
                    item: ['*', {
                        Skills: ['*', {
                            skill_id: ['*']
                        }],
                        Experiences: ['*', {
                            experience_id: ['*']
                        }]
                    }]
                }]
            }],
        })
    ) as unknown as HomepageContent;

    return {
        props: {
            heroBlock: homePageContent.Sections[0].item as HeroBlockType,
            experienceBlock: homePageContent.Sections[1].item as unknown as ExperienceBlockType,
            skillsBlock: homePageContent.Sections[2].item as unknown as SkillBlockType,
            links: homePageContent.Sections.map(section => section.item.Link),
            logo: homePageContent.Logo,
        },
    };
}


export default Home