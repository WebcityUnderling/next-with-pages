const context = require.context('./', true, /\.(json)$/);
const files = {};

context.keys().forEach((filename)=>{
    files[
        filename.replace(/\.json|\.\//g, '').replace(/\//g, '-')
    ] = context(filename);
});

export default files;