import { ContentLoader } from 'vue-content-loader'
export default {
  functional: true,
  props: ['size', 'isPending', 'label', 'value'],
  render (h, context) {
    const staticClass = context.data.staticClass || ''
    const staticStyle = context.data.staticStyle || {}
    const containerProps = {
      class: ['p-5 rounded-lg border border-solid border-gray-300 bg-white shadow-md', staticClass],
      style: staticStyle
    }
    if (context.props.isPending) {
      return (
        <div {...containerProps}>
          <ContentLoader
            speed={2}
            width={400}
            height={80}
            primaryColor="rgba(255,255,255,0.6)"
            secondaryColor="rgba(255,255,255,1)"
            style="max-width: 400px;">
            <rect x={0} y={0} rx={8} ry={6} width="50%" height="16"></rect>
            <rect x={0} y={30} rx={8} ry={6} width="66%" height="16"></rect>
            <rect x={0} y={64} rx={8} ry={6} width="20%" height="16"></rect>
          </ContentLoader>
        </div>
      )
    }
    return (
      <div {...containerProps}>
        <h4 class="text-black opacity-50">
          <b class="uppercase">{ context.props.label }</b>
        </h4>
        <h3 class="text-4xl">
          <b class="inline-block" style="min-width: 2ch;">
            { context.props.value }
          </b>
          <small class="opacity-50 ml-2">orang</small>
        </h3>
      </div>
    )
  }
}
