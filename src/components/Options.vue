<template>
    <md-layout md-align="center">
        <md-card class="caged-card caged-card__medium">
            <md-card-media class="caged-card__medium">
                <div class="caged-card-media__background"></div>
            </md-card-media>
            <md-card-header>
                <md-card-header-text>
                    <div class="md-title" v-html="title"></div>
                </md-card-header-text>
                
                <md-menu md-size="4" md-direction="top left">
                    <md-button class="md-icon-button" md-menu-trigger>
                        <md-icon>more_vert</md-icon>
                    </md-button>

                    <md-menu-content>
                        <md-menu-item target="_blank" href="https://github.com/ralls/caged">
                            <md-icon>code</md-icon>
                            <span>Github</span>
                        </md-menu-item>
                    </md-menu-content>
                </md-menu>
            </md-card-header>
            <md-card-content>
                <md-list>
                    <md-list-item v-for="(option, index) in options" :key="index">
                        <md-avatar>
                            <img :src="`${option.url}40/40`" :alt="option.title">
                        </md-avatar>
                        <span>
                            <md-checkbox
                                @change="toggleOption($event, option.name)"
                                :id="option.name"
                                v-model="option.checked"
                                :disabled="index === 0"
                            >{{ option.title }}</md-checkbox>
                        </span>
                    </md-list-item>
                </md-list>
            </md-card-content>
        </md-card>
        <md-snackbar :md-position="`${snackbar.verticalPos} ${snackbar.horizontalPos}`" ref="snackbar" :md-duration="snackbar.duration">
            <span v-html="snackbar.message"></span>
            <md-button class="md-action md-raised" @click="$refs.snackbar.close()">Close</md-button>
        </md-snackbar>
    </md-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'options',
    data () {
        return {
            title: 'Caged! Settings',
            snackbar: {
                verticalPos: 'bottom',
                horizontalPos: 'center',
                duration: 3500,
                message: 'Caged! Settings Updated'
            }
        }
    },
    computed: {
        ...mapGetters({
            options: 'options'
        })
    },
    methods: {
        toggleOption (e, name) {
            let value = e ? 'checked' : ''
            this.$store.dispatch('updateSettings', {
                name: name,
                value: value
            }).then(() => {
                this.notify()
            })
        },
        notify () {
            this.$refs.snackbar.open()
        }
    },
    created () {
        document.title = this.title
        this.$store.dispatch('getSettings')
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700');
@import "./../../node_modules/vue-material/dist/vue-material.css";

.caged-card {
    margin-top: 3rem;
}

.caged-card__medium,
.caged-card__media__background {
    width: 512px;
}

.caged-card-media__background {
    background: url('http://placecage.com/512/512') top / cover;
    height: 320px;
    display: block;
    margin: 0;
}
</style>
