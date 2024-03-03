<template>
    <div class="main" id="sideBar">
        <div class="button toggle" :class="{ 'sidebar-open': toggleSidebar }"
            @click="stateStore.ToggleSidebar(toggleSidebar ? false : true)" v-if="!inMd">
            <div class="icon" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="catalog" :class="{ 'sidebar-open': toggleSidebar }">
            <div class="aside-container">
                <a class="heading" @click="scrollToTop()">{{ router.currentRoute.value.name }}</a>
                <div class="heading-container">
                    <div v-for="(heading, index) in headings" :key="index" class="headings-h1">
                        <div class="heading-h1" :class="{ current: convertToLink(heading.text) == currentHeading }">
                            <a class="heading-link" :href="'#' + convertToLink(heading.text)">{{
                                heading.text
                            }}</a>
                        </div>
                        <div v-for="(subHeading, subindex) in heading.subHeading" :key="subindex" class="heading-h2"
                            :class="{ current: convertToLink(subHeading.text) == currentHeading }">
                            <div class="heading-h2">
                                <a class="heading-link" :href="'#' + convertToLink(subHeading.text)">{{
                                    subHeading.text
                                }}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { convertToLink, useStatusStore } from '@/use'
import { storeToRefs } from 'pinia'
import router from '@/main'

const stateStore = useStatusStore()
const { headings, currentHeading, toggleSidebar, inMd } = storeToRefs(stateStore)
function scrollToTop() {
    window.scrollTo({ top: 100, behavior: 'smooth' })
}

watch(inMd, (val) => {
    if (val) {
        stateStore.ToggleSidebar(false)
    }
})

</script>

<style lang="scss" scoped>
.main {
    box-sizing: border-box;
    position: sticky;
    top: 120px;
    height: fit-content;
    padding: 0;
    margin-top: 2.7rem;
    margin-bottom: 3em;

    a {
        text-decoration: none;
        color: var(--has-text-dark-grey);
    }

    .catalog {
        width: 100%;
        height: fit-content;
        padding-top: 0rem;
        border-radius: 0 0.75rem 0.75rem 0;
        overflow: hidden;

        .aside-container {
            overflow: hidden;
            width: fit-content;
            opacity: 0;
            font-family: 'Segoe UI';
            padding-left: 2rem;
            transition:
                opacity 0.25s cubic-bezier(0.62, 0, 1, 1),
                width 0.5s ease-in-out;

            .heading {
                font-weight: 700;
                text-transform: uppercase;
                font-size: 1rem;
                letter-spacing: 0.4px;
                color: var(--has-text-black);
                cursor: pointer;
            }

            .headings-h1,
            .headings-h2 {
                margin-bottom: 4px;
                margin-top: 4px;
                padding-left: 0;
            }

            .heading-h2 {
                padding-left: 0.35rem;
            }

            .heading-h1.current,
            .heading-h2.current {
                display: block;
                border-left: 3px solid var(--has-text-success);
                transform: scale(1.1);

                a {
                    color: var(--has-text-black);
                }
            }

            .heading-h1,
            .heading-h2 {
                transition: all 0.15s ease-out;
                border-left: 2px solid transparent;
                margin-bottom: 3px;
                margin-top: 3px;

                a {
                    font-weight: 700;
                    font-size: 0.85rem;

                }
            }

            .heading-h2 {
                a {
                    font-size: 0.75rem;
                }
            }

        }
    }

    .catalog.sidebar-open {
        padding-bottom: 1rem;

        .aside-container {
            opacity: 1;
        }
    }

    .toggle {
        padding: 2px;
        width: 2.25rem;
        color: #070000;
        border: 0px solid #000;
        padding-top: 0.375rem;
        padding-right: 0.5rem;
        margin-left: 1rem;
        border-radius: 0 0.75rem 0.75rem 0;
        height: 2rem;
        cursor: pointer;

        .icon {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 1.25rem;
            height: 1.25rem;
            margin-left: auto;

            span {
                display: inline-block;
                width: 100%;
                height: 3px;
                border-radius: 2px;
                background-color: black;
                transition: transform 0.3s ease;
            }

            span:nth-child(2) {
                margin: 6px 0;
            }
        }
    }

    .toggle.sidebar-open {
        .icon {
            span:nth-child(1) {
                transform: rotate(45deg) translate3d(5.5px, 5.5px, 0);
            }

            span:nth-child(2) {
                transform: scale3d(0, 1, 1);
            }

            span:nth-child(3) {
                transform: rotate(-45deg) translate3d(6px, -6px, 0);
            }

            span:nth-child(1),
            span:nth-child(3) {
                transform-origin: center;
            }
        }
    }
}
</style>
