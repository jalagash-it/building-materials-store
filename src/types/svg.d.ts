declare module '*.svg' {
    import { VueConstructor } from 'vue'

    const content: VueConstructor

    // noinspection JSDuplicatedDeclaration
    export default content
}
