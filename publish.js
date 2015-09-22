var template = require('jsdoc/template');
var helper = require('jsdoc/util/templateHelper');
var fs = require('jsdoc/fs');
var path = require('jsdoc/path');

var data;

var outdir = env.opts.destination;

function find(spec) {
    return helper.find(data, spec);
}

/**
    @param {TAFFY} taffyData See <http://taffydb.com/>.
    @param {object} opts
    @param {Tutorial} tutorials
 */
exports.publish = function(taffyData, opts, tutorials) {
    data = taffyData;
    var templatePath = opts.template;

    data = helper.prune(data);
    view = new template.Template(path.join(templatePath, 'tmpl'));
    view.layout = 'layout.tmpl';

    // update outdir if necessary, then create outdir
    
    var packageInfo = (find({
        kind: 'package'
    }) || [])[0];

    if (packageInfo && packageInfo.name) {
        outdir = path.join(outdir, packageInfo.name, packageInfo.version);
    }

    fs.mkPath(outdir);

    // copy the template's static files to outdir
    var fromDir = path.join(templatePath, 'static');
    var staticFiles = fs.ls(fromDir, 7);

    staticFiles.forEach(function (fileName) {
        var toDir = fs.toDir(fileName.replace(fromDir, outdir));
        fs.mkPath(toDir);
        fs.copyFileSync(fileName, toDir);
    });

    var members = helper.getMembers(data);

    data.sort('longname, version, since');
    helper.addEventListeners(data);

    data().each(function(doclet) {
        html = view.render('index.tmpl', doclet);
        fs.writeFileSync(path.join(outdir, 'index.html'), html, 'utf8');
    });

};