/* eslint-disable */
//prettier-ignore
module.exports = {
name: "@yarnpkg/plugin-snuggery",
factory: function (require) {
var plugin=(()=>{var ue=Object.create,L=Object.defineProperty;var me=Object.getOwnPropertyDescriptor;var ge=Object.getOwnPropertyNames;var he=Object.getPrototypeOf,we=Object.prototype.hasOwnProperty;var ye=r=>L(r,"__esModule",{value:!0});var l=r=>{if(typeof require!="undefined")return require(r);throw new Error('Dynamic require of "'+r+'" is not supported')};var ke=(r,e)=>{for(var s in e)L(r,s,{get:e[s],enumerable:!0})},Ee=(r,e,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of ge(e))!we.call(r,i)&&i!=="default"&&L(r,i,{get:()=>e[i],enumerable:!(s=me(e,i))||s.enumerable});return r},d=r=>Ee(ye(L(r!=null?ue(he(r)):{},"default",r&&r.__esModule&&"default"in r?{get:()=>r.default,enumerable:!0}:{value:r,enumerable:!0})),r);var be={};ke(be,{default:()=>ve});var oe=d(l("@yarnpkg/cli")),R=d(l("@yarnpkg/core")),ne=d(l("clipanion")),G=class extends oe.BaseCommand{constructor(){super(...arguments);this.args=ne.Option.Proxy()}async execute(){let e=await R.Configuration.find(this.context.cwd,this.context.plugins),{project:s,workspace:i}=await R.Project.find(e,this.context.cwd);await s.restoreInstallState();let T=R.structUtils.makeIdent("snuggery","snuggery").identHash,c=[s.topLevelWorkspace];i!=null&&c.unshift(i);for(let[w,m]of c.entries())if(!!m.dependencies.has(T)){if(w===0&&R.scriptUtils.hasWorkspaceScript(m,"sn"))break;return await R.scriptUtils.executePackageAccessibleBinary(m.anchoredLocator,"sn",this.args,{cwd:this.context.cwd,project:s,stdin:this.context.stdin,stdout:this.context.stdout,stderr:this.context.stderr})}return this.cli.run(["run","sn",...this.args])}};G.paths=[["sn"]];var le=d(l("@yarnpkg/cli")),n=d(l("@yarnpkg/core")),E=d(l("@yarnpkg/fslib")),K=d(l("@yarnpkg/plugin-pack")),V=d(l("clipanion"));var b=d(l("@yarnpkg/core")),B=d(l("@yarnpkg/fslib")),N=d(l("@yarnpkg/plugin-essentials")),ie=d(l("semver"));function _(r,e,s){return Object.create(r,{cwd:{value:e,writable:!1,configurable:!0},manifest:{value:b.Manifest.fromText(JSON.stringify(s)),writable:!1,configurable:!0}})}function ae(r){return B.xfs.mktempPromise(async e=>{let s=new B.CwdFS(e);return await b.tgzUtils.extractArchiveTo(r,s,{stripComponents:1}),b.Manifest.fromText(await s.readFilePromise(b.Manifest.fileName,"utf8"))})}var ce="npm:";function q({range:r}){if(r.startsWith(ce)&&(r=r.slice(ce.length)),/^[a-z]+:/.test(r)||r.includes("||")||r.includes("&&")||!b.semverUtils.validRange(r))return N.suggestUtils.Modifier.EXACT;switch(r[0]){case"^":return N.suggestUtils.Modifier.CARET;case"~":return N.suggestUtils.Modifier.TILDE;default:return N.suggestUtils.Modifier.EXACT}}function pe(r,e){let s=q(e);if(s!==N.suggestUtils.Modifier.EXACT)return N.suggestUtils.applyModifier(r,s);let{protocol:i,source:T,selector:c,params:w}=b.structUtils.parseRange(r.range),m=/^\s*>=\s*0\.(\d\d)\d\d(?:.[^ <]+)?\s*<\s*0\.(\d\d)00(?:\.0)?\s*$/.exec(e.range),D=/^0\.(\d\d)\d\d(?:\.\d+)?$/.exec(c);return ie.valid(c)&&D!=null&&m!=null&&+m[2]==+m[1]+1?b.structUtils.makeDescriptor(r,b.structUtils.makeRange({protocol:i,source:T,selector:`>= ${c} < 0.${D[1]}00.0`,params:w})):r}var z=class extends le.BaseCommand{constructor(){super(...arguments);this.json=V.Option.Boolean("--json");this.directory=V.Option.String({required:!0})}async execute(){let e=await n.Configuration.find(this.context.cwd,this.context.plugins);return(await n.StreamReport.start({configuration:e,stdout:this.context.stdout,includeFooter:!1,includeInfos:!0,json:this.json},async i=>{let{project:T,workspace:c}=await n.Project.find(e,this.context.cwd);if(!c){i.reportError(n.MessageName.UNNAMED,"Couldn't find workspace");return}if(c.manifest.name==null){i.reportError(n.MessageName.UNNAMED,`Package at ${n.formatUtils.pretty(e,c.relativeCwd,n.FormatType.PATH)} doesn't have a name`);return}let w=E.ppath.join(T.cwd,"dist");await E.xfs.mkdirPromise(w,{recursive:!0}),await T.restoreInstallState();let m=E.ppath.join(w,`${n.structUtils.slugifyIdent(c.manifest.name)}.tgz`),D=E.ppath.resolve(c.cwd,E.npath.toPortablePath(this.directory));if(!await E.xfs.existsPromise(D)){i.reportError(n.MessageName.UNNAMED,`Build package ${n.formatUtils.pretty(e,c.manifest.name,n.FormatType.IDENT)} first`);return}let P=await E.xfs.readJsonPromise(E.ppath.join(D,E.Filename.manifest)),I=n.structUtils.parseIdent(P.name);if(I.identHash!==c.anchoredDescriptor.identHash){i.reportError(n.MessageName.UNNAMED,`Invalid distribution folder: found package ${n.formatUtils.pretty(e,I,n.FormatType.IDENT)} but expected ${n.formatUtils.pretty(e,c.anchoredDescriptor,n.FormatType.IDENT)}`);return}let H=_(c,D,P),x=await K.packUtils.genPackStream(H,await K.packUtils.genPackList(H));await E.xfs.writeFilePromise(m,await n.miscUtils.bufferStream(x)),i.reportInfo(null,`Packed ${n.formatUtils.pretty(e,I,n.FormatType.IDENT)} into ${n.formatUtils.pretty(e,m,n.FormatType.PATH)}`)})).exitCode()}};z.paths=[["snuggery-workspace","pack"]];var de=d(l("@yarnpkg/cli")),p=d(l("@yarnpkg/core")),O=d(l("@yarnpkg/fslib")),C=d(l("@yarnpkg/plugin-npm")),Q=d(l("clipanion"));var J=class extends de.BaseCommand{constructor(){super(...arguments);this.tag=Q.Option.String("--tag","latest");this.json=Q.Option.Boolean("--json")}async execute(){let e=await p.Configuration.find(this.context.cwd,this.context.plugins);return(await p.StreamReport.start({configuration:e,stdout:this.context.stdout,json:this.json,includeInfos:!0},async i=>{let{project:T,workspace:c}=await p.Project.find(e,this.context.cwd);if(!c){i.reportError(p.MessageName.UNNAMED,"Couldn't find workspace");return}if(c.manifest.name===null||c.manifest.version===null){i.reportError(p.MessageName.UNNAMED,"Workspaces must have valid names and versions to be published on an external registry");return}let w=c.manifest.name,m=O.ppath.join(T.cwd,"dist",`${p.structUtils.slugifyIdent(w)}.tgz`);if(!await O.xfs.existsPromise(m)){i.reportError(p.MessageName.UNNAMED,`Pack package ${p.formatUtils.pretty(e,w,p.FormatType.IDENT)} first`);return}let D=await O.xfs.readFilePromise(m),P=await ae(D);if(P.name==null||P.name.identHash!==w.identHash){i.reportError(p.MessageName.UNNAMED,`Tarball for package ${P.name&&p.formatUtils.pretty(e,P.name,p.FormatType.IDENT)} cannot be published in workspace for ${p.formatUtils.pretty(e,w,p.FormatType.IDENT)}`);return}let I=C.npmConfigUtils.getPublishRegistry(P,{configuration:e}),H=await C.npmPublishUtils.makePublishBody(_(c,c.cwd,P.raw),D,{access:void 0,tag:this.tag,registry:I});try{await C.npmHttpUtils.put(C.npmHttpUtils.getIdentUrl(w),H,{configuration:e,registry:I,ident:w,jsonResponse:!0})}catch(x){if(x.name!=="HTTPError")throw x;{let W=x.response.body&&x.response.body.error?x.response.body.error:`The remote server answered with HTTP ${x.response.statusCode} ${x.response.statusMessage}`;i.reportError(p.MessageName.NETWORK_ERROR,W)}}i.hasErrors()||i.reportInfo(null,`Published ${p.formatUtils.pretty(e,p.structUtils.makeDescriptor(w,P.version),p.FormatType.DESCRIPTOR)}`)})).exitCode()}};J.paths=[["snuggery-workspace","publish"]];var X=d(l("@yarnpkg/cli")),t=d(l("@yarnpkg/core")),M=d(l("@yarnpkg/fslib")),S=d(l("@yarnpkg/plugin-essentials")),Z=d(l("@yarnpkg/plugin-npm")),F=d(l("clipanion")),$=d(l("semver"));var Pe="migrations.json",Y=class extends X.BaseCommand{constructor(){super(...arguments);this.patterns=F.Option.Rest()}async execute(){let e=await t.Configuration.find(this.context.cwd,this.context.plugins),{project:s,workspace:i}=await t.Project.find(e,this.context.cwd),T=await t.Cache.find(e);if(!i)throw new X.WorkspaceRequiredError(s.cwd,this.context.cwd);await s.restoreInstallState();let c=[S.suggestUtils.Strategy.PROJECT,S.suggestUtils.Strategy.LATEST],w=[],m=[],D=e.get("defaultProtocol"),P=o=>{let g=t.structUtils.parseRange(o.range);g.protocol||(g.protocol=D,o=t.structUtils.makeDescriptor(o,t.structUtils.makeRange(g)));let a=s.storedResolutions.get(o.descriptorHash);if(a==null)throw new Error(`Assertion failed: expected ${t.structUtils.stringifyDescriptor(o)} to be resolved`);let f=s.storedPackages.get(a);if(!f)throw new Error(`Assertion failed: expected ${t.structUtils.stringifyDescriptor(o)} to be installed, try running an installation`);return f};for(let o of this.patterns){let g=!1,a=t.structUtils.parseDescriptor(o);for(let f of s.workspaces)for(let v of[S.suggestUtils.Target.REGULAR,S.suggestUtils.Target.DEVELOPMENT]){if(!f.manifest.getForScope(v).has(a.identHash))continue;let y=f.manifest[v].get(a.identHash);if(typeof y=="undefined")throw new Error("Assertion failed: Expected the descriptor to be registered");w.push(Promise.resolve().then(async()=>[f,v,y,await S.suggestUtils.getSuggestedDescriptors(a,{project:s,workspace:f,cache:T,target:v,modifier:q(a),strategies:c})])),g=!0}g||m.push(o)}if(m.length>1)throw new F.UsageError(`Patterns ${t.formatUtils.prettyList(e,m,t.FormatType.CODE)} don't match any packages referenced by any workspace`);if(m.length>0)throw new F.UsageError(`Pattern ${t.formatUtils.prettyList(e,m,t.FormatType.CODE)} doesn't match any packages referenced by any workspace`);let I=await Promise.all(w),H=await t.LightReport.start({configuration:e,stdout:this.context.stdout,suggestInstall:!1},async o=>{for(let[,,g,{suggestions:a,rejections:f}]of I){let v=a.filter(y=>y.descriptor!==null);if(v.length===0){let[y]=f;if(typeof y=="undefined")throw new Error("Assertion failed: Expected an error to have been set");let k=this.cli.error(y);s.configuration.get("enableNetwork")?o.reportError(t.MessageName.CANT_SUGGEST_RESOLUTIONS,`${t.structUtils.prettyDescriptor(e,g)} can't be resolved to a satisfying range

${k}`):o.reportError(t.MessageName.CANT_SUGGEST_RESOLUTIONS,`${t.structUtils.prettyDescriptor(e,g)} can't be resolved to a satisfying range (note: network resolution has been disabled)

${k}`)}else v.length>1&&o.reportError(t.MessageName.CANT_SUGGEST_RESOLUTIONS,`${t.structUtils.prettyDescriptor(e,g)} has multiple possible upgrade strategies; are you trying to update a local package?`)}});if(H.hasErrors())return H.exitCode();let x=[],W=e.makeResolver(),ee=new Map,te=new Map,re=async o=>{let g=await Z.npmHttpUtils.get(Z.npmHttpUtils.getIdentUrl(o),{configuration:e,ident:o,jsonResponse:!0}),a="version"in o&&o.version?o.version:$.clean(t.structUtils.parseRange(o.reference).selector),f=g.versions[a];if(f==null)throw new Error(`Assertion failed: version ${a} not found in registry`);return f},se=await t.LightReport.start({configuration:e,stdout:this.context.stdout,suggestInstall:!1},async o=>{var g;for(let[a,f,,{suggestions:v}]of I){let y=v.find(h=>h.descriptor!=null).descriptor,k=a.manifest[f].get(y.identHash);if(typeof k=="undefined")throw new Error("Assertion failed: This descriptor should have a matching entry");if(k.descriptorHash===y.descriptorHash)continue;let U=ee.get(y.descriptorHash);if(U==null){let h=await W.getCandidates(y,new Map,{project:s,report:o,resolver:W});if(h.length===0)throw new Error("Assertion failed: candidate has to be found");let u=(g=(await re(h[0]))["ng-update"])==null?void 0:g.packageGroup;Array.isArray(u)?U=u.map(j=>t.structUtils.makeDescriptor(t.structUtils.parseIdent(j),y.range)):typeof u=="object"&&u!=null?U=Object.entries(u).map(([j,fe])=>t.structUtils.makeDescriptor(t.structUtils.parseIdent(j),`${fe}`)):U=[y];for(let{descriptorHash:j}of U)ee.set(j,U)}for(let h of U){let A=a.manifest[f].get(h.identHash);if(A==null)continue;a.manifest[f].set(h.identHash,h);let u=a.manifest.peerDependencies.get(h.identHash);u!=null&&a.manifest.peerDependencies.set(h.identHash,pe(h,u)),x.push([a,f,A,h]),te.set(P(A),h)}}});return se.hasErrors()?se.exitCode():(await e.triggerMultipleHooks(o=>o.afterWorkspaceDependencyReplacement,x),(await t.StreamReport.start({configuration:e,stdout:this.context.stdout},async o=>{await s.install({cache:T,report:o,mode:t.InstallMode.UpdateLockfile}),await o.startTimerPromise("Preparing migration",async()=>{var f,v,y;let g=M.ppath.join(s.cwd,Pe),a=new Map;if(await M.xfs.existsPromise(g))for(let k of await M.xfs.readJsonPromise(g))a.set(t.structUtils.parseIdent(k.package).identHash,k);for(let[k,U]of te){let h=P(U),A=t.structUtils.stringifyIdent(k);if(!((f=(await re(h))["ng-update"])==null?void 0:f.migrations))continue;let u=a.get(k.identHash);u!=null?(k.version&&$.lt(k.version,u.from)&&(u.from=k.version,delete u.includedMigrations,delete u.skippedMigrations),h.version&&$.gt(h.version,u.to)&&(u.to=h.version,delete u.includedMigrations,delete u.skippedMigrations)):(u={package:A,from:(v=k.version)!=null?v:"unknown",to:(y=h.version)!=null?y:"unknown"},a.set(k.identHash,u))}a.size&&await M.xfs.writeJsonPromise(g,Array.from(a.values())),o.reportInfo(null,`Changes have been made to the ${t.formatUtils.pretty(e,M.Filename.manifest,t.formatUtils.Type.PATH)} files and to ${t.formatUtils.pretty(e,M.Filename.lockfile,t.formatUtils.Type.PATH)} and the new packages have been downloaded, but no packages have been installed yet into ${t.formatUtils.pretty(e,M.Filename.nodeModules,t.formatUtils.Type.PATH)} or ${t.formatUtils.pretty(e,M.Filename.pnpCjs,t.formatUtils.Type.PATH)}.`),o.reportInfo(null,`You can add extra migrations by executing ${t.formatUtils.pretty(e,"`yarn sn run update <package@version> [...package@version]`",t.formatUtils.Type.CODE)} again.`),o.reportInfo(null,"If you are ready to apply the update, continue with the instructions below."),o.reportInfo(null,`First, check whether everything looks okay and perform the actual installation via ${t.formatUtils.pretty(e,"`yarn install`",t.formatUtils.Type.CODE)}`),a.size&&o.reportInfo(null,`Then, continue with executing the migrations. Run ${t.formatUtils.pretty(e,"`yarn sn help update`",t.formatUtils.Type.CODE)} for instructions.`)})})).exitCode())}};Y.paths=[["snuggery-workspace","up"]];var xe={commands:[G,...process.env.SNUGGERY_YARN==="1"?[z,J,Y]:[]],hooks:{setupScriptEnvironment(r,e,s){return s("sn",process.execPath,[process.argv[1],"sn"])}}},ve=xe;return be;})();
return plugin;
}
};
