import{b as P,e as D}from"./chunk-5D2HPDZW.js";import{G as z,I as v,O as F,P as V,W as Y,a as O,b as u,c as R,d as A,e as g,f as M,fa as H,ga as j,h as S,i as L,n as N,o as k}from"./chunk-JF7UL6B3.js";import"./chunk-VOBDEVQM.js";import{Da as a,Na as l,Ra as w,Sb as C,Ub as d,Va as o,Wa as s,Xa as I,Z as y,aa as b,ac as E,ca as h,cb as _,da as m,ea as T,ib as n,jb as f,ob as x}from"./chunk-A3EEWFK3.js";var B=20;var Z=new b("mat-tooltip-scroll-strategy");function $(i){return()=>i.scrollStrategies.reposition({scrollThrottle:B})}var Q={provide:Z,deps:[H],useFactory:$};var G=(()=>{let t=class t{};t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=T({type:t}),t.\u0275inj=y({providers:[Q],imports:[z,d,j,v,v,Y]});let i=t;return i})();function q(i,t){i&1&&(o(0,"mat-error",7),n(1,"This user is not registered"),s())}var zt=(()=>{let t=class t{constructor(){this.formBuilder=h(N),this.authService=h(E),this.router=h(P),this.infoTooltipText=`Registered users: ${this.authService.getAllRegisteredUsers().join(", ")}`,this.loginForm=this.formBuilder.group({loginName:new g("",[u.required,this.validateUserName()]),password:new g("",[u.required])})}ngOnInit(){}ngOnDestroy(){}logIn(){this.authService.logIn(this.loginForm.value.loginName),this.router.navigate(["/home"])}logOut(){this.authService.logOut(),this.router.navigate(["/loxxxgin"])}validateUserName(){return c=>{let e=c.value;return this.authService.getAllRegisteredUsers().includes(e)?null:{userDoesntExist:!0}}}};t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=m({type:t,selectors:[["app-login"]],standalone:!0,features:[x],decls:13,vars:4,consts:[[1,"login",3,"formGroup","ngSubmit"],[1,"login__title"],["placeholder","Login","formControlName","loginName",1,"login__login-name-input"],["type","password","placeholder","Password","formControlName","password",1,"login__password-input"],["class","login__error",4,"ngIf"],[1,"login__information"],["type","submit",1,"login__button",3,"disabled"],[1,"login__error"]],template:function(e,r){if(e&1&&(o(0,"div")(1,"form",0),_("ngSubmit",function(){return r.logIn()}),o(2,"h1",1),n(3,"Log In"),s(),I(4,"input",2)(5,"input",3),w(6,q,2,0,"mat-error",4),o(7,"p",5)(8,"b"),n(9,"Hint: "),s(),n(10),s(),o(11,"button",6),n(12,"Log In"),s()()()),e&2){let p;a(1),l("formGroup",r.loginForm),a(5),l("ngIf",((p=r.loginForm.get("loginName"))==null?null:p.hasError("userDoesntExist"))&&!r.loginForm.pristine),a(4),f(r.infoTooltipText),a(1),l("disabled",!r.loginForm.valid)}},dependencies:[d,C,k,M,O,R,A,S,L,V,F,G,D],styles:[".login[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;padding:1em}.login__title[_ngcontent-%COMP%]{margin-top:.25em}.login__button[_ngcontent-%COMP%]{margin:1em;font-size:1em;font-weight:700;padding:.2em 2em;display:flex;justify-content:space-around}.login__login-name-input[_ngcontent-%COMP%], .login__password-input[_ngcontent-%COMP%]{font-size:1em;padding:.2em;margin:.25em}.login__error[_ngcontent-%COMP%]{color:red}.login__information[_ngcontent-%COMP%]{font-size:.75em}"]});let i=t;return i})();export{zt as LoginComponent};
