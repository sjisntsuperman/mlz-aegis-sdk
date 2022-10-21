import { BaseHandlerType } from '@aegis/types'

export const VueHandler: BaseHandlerType = {
    name: "vue",
    monitor(notify: any) { 
        const Vue = this.options.vue
        if (Vue && Vue.config) {
            const origin = Vue.config.errorHandler
            Vue.config.errorHandler = function (err: Error, vm: any, info: string) {
                const data = {}
                notify('vue', { data, vm })
                const hasConsole = typeof console !== 'undefined'
                if (hasConsole && Vue.config.silent) {
                    console.error(info, err.toString(), vm)
                    console.log(err)
                }
                return origin?.(err, vm, info)
            }
            
        }
    },
    transform(target: any) {
        const {
            data, vm
        } = target
        return {
            ...data,
            vm
        }
    },
    consumer(data: any) {
        this.transport.send(data)
    }
}