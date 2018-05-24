
var nss = ['call', 'ea', 'mobile/ka', 'mobile/call'];
var res = '';
res +=  `<h1>组件</h1>\n\r
<table>
    <tr><td>组件</td><td><a target="_blank" href="/examples/pages/index">/examples/pages/index</a></td></tr>
    <tr><td>图标仪表盘</td><td><a target="_blank" href="/iconTool">/iconTool</a></td></tr>
</table>\n\r
`
nss.forEach((ns) => {
    res += `<h1>${ns}</h1>\n\r`;
    var url = `../src/pages/${ns}/route.config.js`;
    delete require.cache[require.resolve(url)];
    var routes =  require(url);
    var table = `<table>
        ${routes.map((route)=>{
            let children = route.children || [];

            return children.reduce((prev, cur) => {
                return prev + tr(cur, ns, {
                    title: (route.meta && route.meta.title || route.path) + '-',
                    path: route.path + '/'
                })
            }, tr(route, ns))

        }).join('')}
        </table>\n\r`;
    res += table;
})

function tr(route, ns, parent = {
    title: '',
    path: ''
}) {
    return `<tr>
        <td>${route.meta && parent.title + route.meta.title  || parent.path + route.path}</td>
        <td><a target="_blank" href="/${ns}${parent.path + route.path}">${parent.path + route.path}</a></td>
    </tr>`
}

var html = `
<!DOCTYPE HTML>
<html>
<head>
<title>dashboard</title>
<meta charset="utf-8">
</head>
<style>
    table {
        border-collapse: collapse;
    }
    td {
        border: 1px solid #ccc;
        padding: 10px;
    }
</style>
<body>
${res}
</body>
</html>
`
module.exports = html;
