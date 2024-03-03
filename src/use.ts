import { defineStore } from 'pinia'
import { useColorMode, useWindowScroll, useWindowSize, useLocalStorage } from "@vueuse/core";
import { computed, ref, type Ref } from 'vue';

const { y } = useWindowScroll();
const { width } = useWindowSize();
export const themeMode = useColorMode();
export const useStatusStore = defineStore('status', () => {
    const loading = ref(false)
    const to = ref('/' + profile.teamName + '/')
    const headings = ref([] as { text: string, subHeading: { text: string }[] }[])
    const toggleSidebar = useLocalStorage('toggleSidebar', false) as Ref<boolean>;
    const headingOffsetTop = ref({} as { [key: string]: number });
    const sidebarAppear = ref(true)

    function setLoading(value: boolean) {
        loading.value = value
    }

    function updateHeadings() {
        let Headings = [] as { text: string, subHeading: { text: string }[] }[];
        let HeadingOffsetTop = {} as { [key: string]: number };
        let headingElements = document.querySelectorAll('h2,h3');
        headingElements.forEach((heading) => {
            heading.id = convertToLink(heading.innerHTML.replace(/<[^>]+>/g, ''));

            HeadingOffsetTop[heading.id] = (heading as HTMLElement).offsetTop + ((heading as HTMLElement).offsetParent as HTMLElement).offsetTop;
            if (heading.nodeName == "H2") {
                Headings.push({
                    text: heading.innerHTML.replace(/<[^>]+>/g, ''),
                    subHeading: []
                });
            } else {
                if (Headings.length) {
                    Headings[Headings.length - 1].subHeading.push({
                        text: heading.innerHTML.replace(/<[^>]+>/g, '')
                    });
                }
            }
        })
        headingOffsetTop.value = HeadingOffsetTop;
        headings.value = Headings;
    }
    function RouteDestiny(val: string) {
        to.value = val
    }
    function ToggleSidebar(val: boolean) {
        toggleSidebar.value = val
    }
    function SidebarAppear(val: boolean) {
        sidebarAppear.value = val
    }
    const currentHeading = computed(() => {
        let currentHeading = "";
        for (let heading in headingOffsetTop.value) {
            if (y.value + 65 > headingOffsetTop.value[heading]) {
                currentHeading = heading;
            }
        }
        return currentHeading;
    });

    const inMd = computed(() => {
        return width.value < 1000
    });

    return { loading, headings, to, toggleSidebar, inMd, headingOffsetTop, currentHeading, y, sidebarAppear, setLoading, updateHeadings, RouteDestiny, ToggleSidebar, SidebarAppear }
})

export function convertToLink(name: string) {
  return name.toLowerCase().replace(/ /g, '-')
}

export const profile = {
    teamName: "zjut-china",
    year: "2024",
    TEAM_NAME: "ZJUT-China",
}
