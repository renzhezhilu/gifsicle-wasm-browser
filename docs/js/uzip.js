var UZIP={};UZIP.parse=function(i,j){for(var d=UZIP.bin.readUshort,c=UZIP.bin.readUint,a=0,f={},b=new Uint8Array(i),e=b.length-4;101010256!=c(b,e);)e--;var a=e;a+=4;var k=d(b,a+=4),r=d(b,a+=2),g=c(b,a+=2),l=c(b,a+=4);a+=4,a=l;for(var h=0;h<k;h++){var s=c(b,a);a+=4,a+=4,a+=4;var t=c(b,a+=4),g=c(b,a+=4),m=c(b,a+=4),n=d(b,a+=4),o=d(b,a+2),p=d(b,a+4);a+=6,a+=8;var q=c(b,a);a+=4,a+=n+o+p,UZIP._readLocal(b,q,f,g,m,j)}return f},UZIP._readLocal=function(b,a,d,h,i,m){var c=UZIP.bin.readUshort,e=UZIP.bin.readUint,o=e(b,a),p=c(b,a+=4),q=c(b,a+=2),f=c(b,a+=2),r=e(b,a+=2),s=e(b,a+=4);a+=4;var j=c(b,a+=8),n=c(b,a+=2);a+=2;var g=UZIP.bin.readUTF8(b,a,j);if(a+=j,a+=n,m){d[g]={size:i,csize:h};return}var k=new Uint8Array(b.buffer,a);if(0==f)d[g]=new Uint8Array(k.buffer.slice(a,a+h));else if(8==f){var l=new Uint8Array(i);UZIP.inflateRaw(k,l),d[g]=l}else throw"unknown compression method: "+f},UZIP.inflateRaw=function(a,b){return UZIP.F.inflate(a,b)},UZIP.inflate=function(a,b){return a[0],a[1],UZIP.inflateRaw(new Uint8Array(a.buffer,a.byteOffset+2,a.length-6),b)},UZIP.deflate=function(c,e){null==e&&(e={level:6});var a=0,b=new Uint8Array(50+Math.floor(1.1*c.length));b[a]=120,b[a+1]=156,a+=2,a=UZIP.F.deflateRaw(c,b,a,e.level);var d=UZIP.adler(c,0,c.length);return b[a+0]=d>>>24&255,b[a+1]=d>>>16&255,b[a+2]=d>>>8&255,b[a+3]=d>>>0&255,new Uint8Array(b.buffer,0,a+4)},UZIP.deflateRaw=function(b,a){null==a&&(a={level:6});var c=new Uint8Array(50+Math.floor(1.1*b.length)),d=UZIP.F.deflateRaw(b,c,d,a.level);return new Uint8Array(c.buffer,0,d)},UZIP.encode=function(l,f){null==f&&(f=!1);var g=0,h=UZIP.bin.writeUint,m=UZIP.bin.writeUshort,d={};for(var b in l){var n=!UZIP._noNeed(b)&&!f,e=l[b],p=UZIP.crc.crc(e,0,e.length);d[b]={cpr:n,usize:e.length,crc:p,file:n?UZIP.deflateRaw(e):e}}for(var b in d)g+=d[b].file.length+30+46+2*UZIP.bin.sizeUTF8(b);g+=22;var c=new Uint8Array(g),a=0,i=[];for(var b in d){var j=d[b];i.push(a),a=UZIP._writeHeader(c,a,b,j,0)}var k=0,o=a;for(var b in d){var j=d[b];i.push(a),a=UZIP._writeHeader(c,a,b,j,1,i[k++])}var q=a-o;return h(c,a,101010256),a+=4,m(c,a+=4,k),m(c,a+=2,k),h(c,a+=2,q),h(c,a+=4,o),a+=4,a+=2,c.buffer},UZIP._noNeed=function(a){var b=a.split(".").pop().toLowerCase();return -1!="png,jpg,jpeg,zip".indexOf(b)},UZIP._writeHeader=function(b,a,h,e,f,i){var c=UZIP.bin.writeUint,d=UZIP.bin.writeUshort,g=e.file;c(b,a,0==f?67324752:33639248),a+=4,1==f&&(a+=2),d(b,a,20),d(b,a+=2,0),d(b,a+=2,e.cpr?8:0),c(b,a+=2,0),c(b,a+=4,e.crc),c(b,a+=4,g.length),c(b,a+=4,e.usize),d(b,a+=4,UZIP.bin.sizeUTF8(h)),d(b,a+=2,0),a+=2,1==f&&(a+=2,a+=2,c(b,a+=6,i),a+=4);var j=UZIP.bin.writeUTF8(b,a,h);return a+=j,0==f&&(b.set(g,a),a+=g.length),a},UZIP.crc={table:function(){for(var c=new Uint32Array(256),b=0;b<256;b++){for(var a=b,d=0;d<8;d++)1&a?a=3988292384^a>>>1:a>>>=1;c[b]=a}return c}(),update:function(a,c,d,e){for(var b=0;b<e;b++)a=UZIP.crc.table[(a^c[d+b])&255]^a>>>8;return a},crc:function(a,b,c){return 4294967295^UZIP.crc.update(4294967295,a,b,c)}},UZIP.adler=function(f,d,g){for(var a=1,c=0,b=d,e=d+g;b<e;){for(var h=Math.min(b+5552,e);b<h;)a+=f[b++],c+=a;a%=65521,c%=65521}return c<<16|a},UZIP.bin={readUshort:function(a,b){return a[b]|a[b+1]<<8},writeUshort:function(a,b,c){a[b]=255&c,a[b+1]=c>>8&255},readUint:function(a,b){return 16777216*a[b+3]+(a[b+2]<<16|a[b+1]<<8|a[b])},writeUint:function(a,b,c){a[b]=255&c,a[b+1]=c>>8&255,a[b+2]=c>>16&255,a[b+3]=c>>24&255},readASCII:function(c,d,e){for(var b="",a=0;a<e;a++)b+=String.fromCharCode(c[d+a]);return b},writeASCII:function(c,d,b){for(var a=0;a<b.length;a++)c[d+a]=b.charCodeAt(a)},pad:function(a){return a.length<2?"0"+a:a},readUTF8:function(b,c,d){for(var e,f="",a=0;a<d;a++)f+="%"+UZIP.bin.pad(b[c+a].toString(16));try{e=decodeURIComponent(f)}catch(g){return UZIP.bin.readASCII(b,c,d)}return e},writeUTF8:function(c,d,f){for(var g=f.length,a=0,e=0;e<g;e++){var b=f.charCodeAt(e);if((4294967168&b)==0)c[d+a]=b,a++;else if((4294965248&b)==0)c[d+a]=192|b>>6,c[d+a+1]=128|b>>0&63,a+=2;else if((4294901760&b)==0)c[d+a]=224|b>>12,c[d+a+1]=128|b>>6&63,c[d+a+2]=128|b>>0&63,a+=3;else if((4292870144&b)==0)c[d+a]=240|b>>18,c[d+a+1]=128|b>>12&63,c[d+a+2]=128|b>>6&63,c[d+a+3]=128|b>>0&63,a+=4;else throw"e"}return a},sizeUTF8:function(d){for(var e=d.length,a=0,c=0;c<e;c++){var b=d.charCodeAt(c);if((4294967168&b)==0)a++;else if((4294965248&b)==0)a+=2;else if((4294901760&b)==0)a+=3;else if((4292870144&b)==0)a+=4;else throw"e"}return a}},UZIP.F={},UZIP.F.deflateRaw=function(g,o,z,t){var u=[[0,0,0,0,0],[4,4,8,4,0],[4,5,16,8,0],[4,6,16,16,0],[4,10,16,32,0],[8,16,32,32,0],[8,16,128,128,0],[8,32,128,256,0],[32,128,258,1024,1],[32,258,258,4096,1]][t],e=UZIP.F.U,v=UZIP.F._goodIndex,A=(UZIP.F._hash,UZIP.F._putsE),a=0,c=z<<3,f=0,d=g.length;if(0==t){for(;a<d;){var h=Math.min(65535,d-a);A(o,c,a+h==d?1:0),c=UZIP.F._copyExact(g,a,h,o,c+8),a+=h}return c>>>3}var j=e.lits,p=e.strt,w=e.prev,b=0,l=0,i=0,m=0,x=0,n=0;for(d>2&&(p[n=UZIP.F._hash(g,0)]=0),a=0;a<d;a++){if(x=n,a+1<d-2){n=UZIP.F._hash(g,a+1);var y=a+1&32767;w[y]=p[n],p[n]=y}if(f<=a){(b>14e3||l>26697)&&d-a>100&&(f<a&&(j[b]=a-f,b+=2,f=a),c=UZIP.F._writeBlock(a==d-1||f==d?1:0,j,b,m,g,i,a-i,o,c),b=l=m=0,i=a);var k=0;a<d-2&&(k=UZIP.F._bestMatch(g,a,w,x,Math.min(u[2],d-a),u[3]));var h=k>>>16,q=65535&k;if(0!=k){var h=k>>>16,q=65535&k,r=v(h,e.of0);e.lhst[257+r]++;var s=v(q,e.df0);e.dhst[s]++,m+=e.exb[r]+e.dxb[s],j[b]=h<<23|a-f,j[b+1]=q<<16|r<<8|s,b+=2,f=a+h}else e.lhst[g[a]]++;l++}}for((i!=a||0==g.length)&&(f<a&&(j[b]=a-f,b+=2,f=a),c=UZIP.F._writeBlock(1,j,b,m,g,i,a-i,o,c),b=0,l=0,b=l=m=0,i=a);(7&c)!=0;)c++;return c>>>3},UZIP.F._bestMatch=function(g,b,h,n,o,p){var e=32767&b,c=h[e],a=e-c+32768&32767;if(c==e||n!=UZIP.F._hash(g,b-a))return 0;for(var d=0,k=0,q=Math.min(32767,b);a<=q&&0!= --p&&c!=e;){if(0==d||g[b+d]==g[b+d-a]){var f=UZIP.F._howLong(g,b,a);if(f>d){if(d=f,k=a,d>=o)break;a+2<f&&(f=a+2);for(var l=0,i=0;i<f-2;i++){var j=b-a+i+32768&32767,r=h[j],m=j-r+32768&32767;m>l&&(l=m,c=j)}}}c=h[e=c],a+=e-c+32768&32767}return d<<16|k},UZIP.F._howLong=function(b,a,c){if(b[a]!=b[a-c]||b[a+1]!=b[a+1-c]||b[a+2]!=b[a+2-c])return 0;var d=a,e=Math.min(b.length,a+258);for(a+=3;a<e&&b[a]==b[a-c];)a++;return a-d},UZIP.F._hash=function(a,b){return(a[b]<<8|a[b+1])+(a[b+2]<<4)&65535},UZIP.saved=0,UZIP.F._writeBlock=function(z,q,A,r,s,t,u,c,b){var a=UZIP.F.U,j=UZIP.F._putsF,e=UZIP.F._putsE;a.lhst[256]++,H=(G=UZIP.F.getTrees())[0],I=G[1],J=G[2],K=G[3],L=G[4],x=G[5],B=G[6],C=G[7];var v=((b+3&7)==0?0:8-(b+3&7))+32+(u<<3),w=r+UZIP.F.contSize(a.fltree,a.lhst)+UZIP.F.contSize(a.fdtree,a.dhst),k=r+UZIP.F.contSize(a.ltree,a.lhst)+UZIP.F.contSize(a.dtree,a.dhst);k+=14+3*x+UZIP.F.contSize(a.itree,a.ihst)+(2*a.ihst[16]+3*a.ihst[17]+7*a.ihst[18]);for(var d=0;d<286;d++)a.lhst[d]=0;for(var d=0;d<30;d++)a.dhst[d]=0;for(var d=0;d<19;d++)a.ihst[d]=0;var f=v<w&&v<k?0:w<k?1:2;if(j(c,b,z),j(c,b+1,f),b+=3,0==f){for(;(7&b)!=0;)b++;b=UZIP.F._copyExact(s,t,u,c,b)}else{if(1==f&&(l=a.fltree,D=a.fdtree),2==f){UZIP.F.makeCodes(a.ltree,H),UZIP.F.revCodes(a.ltree,H),UZIP.F.makeCodes(a.dtree,I),UZIP.F.revCodes(a.dtree,I),UZIP.F.makeCodes(a.itree,J),UZIP.F.revCodes(a.itree,J),l=a.ltree,D=a.dtree,e(c,b,K-257),b+=5,e(c,b,L-1),b+=5,e(c,b,x-4),b+=4;for(var G,H,I,J,K,L,x,B,C,l,D,g=0;g<x;g++)e(c,b+3*g,a.itree[(a.ordr[g]<<1)+1]);b+=3*x,b=UZIP.F._codeTiny(B,a.itree,c,b),b=UZIP.F._codeTiny(C,a.itree,c,b)}for(var h=t,i=0;i<A;i+=2){for(var y=q[i],m=y>>>23,E=h+(8388607&y);h<E;)b=UZIP.F._writeLit(s[h++],l,c,b);if(0!=m){var n=q[i+1],F=n>>16,o=n>>8&255,p=255&n;b=UZIP.F._writeLit(257+o,l,c,b),e(c,b,m-a.of0[o]),b+=a.exb[o],b=UZIP.F._writeLit(p,D,c,b),j(c,b,F-a.df0[p]),b+=a.dxb[p],h+=m}}b=UZIP.F._writeLit(256,l,c,b)}return b},UZIP.F._copyExact=function(e,f,c,b,d){var a=d>>>3;return b[a]=c,b[a+1]=c>>>8,b[a+2]=255-b[a],b[a+3]=255-b[a+1],a+=4,b.set(new Uint8Array(e.buffer,f,c),a),d+(c+4<<3)},UZIP.F.getTrees=function(){for(var a=UZIP.F.U,f=UZIP.F._hufTree(a.lhst,a.ltree,15),g=UZIP.F._hufTree(a.dhst,a.dtree,15),c=[],h=UZIP.F._lenCodes(a.ltree,c),d=[],i=UZIP.F._lenCodes(a.dtree,d),b=0;b<c.length;b+=2)a.ihst[c[b]]++;for(var b=0;b<d.length;b+=2)a.ihst[d[b]]++;for(var j=UZIP.F._hufTree(a.ihst,a.itree,7),e=19;e>4&&0==a.itree[(a.ordr[e-1]<<1)+1];)e--;return[f,g,j,h,i,e,c,d]},UZIP.F.getSecond=function(b){for(var c=[],a=0;a<b.length;a+=2)c.push(b[a+1]);return c},UZIP.F.nonZero=function(b){for(var c="",a=0;a<b.length;a+=2)0!=b[a+1]&&(c+=(a>>1)+",");return c},UZIP.F.contSize=function(d,b){for(var c=0,a=0;a<b.length;a++)c+=b[a]*d[(a<<1)+1];return c},UZIP.F._codeTiny=function(d,g,e,a){for(var b=0;b<d.length;b+=2){var c=d[b],h=d[b+1];a=UZIP.F._writeLit(c,g,e,a);var f=16==c?2:17==c?3:7;c>15&&(UZIP.F._putsE(e,a,h,f),a+=f)}return a},UZIP.F._lenCodes=function(e,g){for(var b=e.length;2!=b&&0==e[b-1];)b-=2;for(var a=0;a<b;a+=2){var c=e[a+1],h=a+3<b?e[a+3]:-1,i=a+5<b?e[a+5]:-1,j=0==a?-1:e[a-1];if(0==c&&h==c&&i==c){for(var d=a+5;d+2<b&&e[d+2]==c;)d+=2;var f=Math.min(d+1-a>>>1,138);f<11?g.push(17,f-3):g.push(18,f-11),a+=2*f-2}else if(c==j&&h==c&&i==c){for(var d=a+5;d+2<b&&e[d+2]==c;)d+=2;var f=Math.min(d+1-a>>>1,6);g.push(16,f-3),a+=2*f-2}else g.push(c,0)}return b>>>1},UZIP.F._hufTree=function(l,c,m){var a=[],o=l.length,p=c.length,b=0;for(b=0;b<p;b+=2)c[b]=0,c[b+1]=0;for(b=0;b<o;b++)0!=l[b]&&a.push({lit:b,f:l[b]});var d=a.length,g=a.slice(0);if(0==d)return 0;if(1==d){var n=a[0].lit,g=0==n?1:0;return c[(n<<1)+1]=1,c[(g<<1)+1]=1,1}a.sort(function(a,b){return a.f-b.f});var h=a[0],i=a[1],e=0,j=1,f=2;for(a[0]={lit:-1,f:h.f+i.f,l:h,r:i,d:0};j!=d-1;)h=e!=j&&(f==d||a[e].f<a[f].f)?a[e++]:a[f++],i=e!=j&&(f==d||a[e].f<a[f].f)?a[e++]:a[f++],a[j++]={lit:-1,f:h.f+i.f,l:h,r:i};var k=UZIP.F.setDepth(a[j-1],0);for(k>m&&(UZIP.F.restrictDepth(g,m,k),k=m),b=0;b<d;b++)c[(g[b].lit<<1)+1]=g[b].d;return k},UZIP.F.setDepth=function(a,b){return -1!=a.lit?(a.d=b,b):Math.max(UZIP.F.setDepth(a.l,b+1),UZIP.F.setDepth(a.r,b+1))},UZIP.F.restrictDepth=function(b,c,f){var a=0,g=1<<f-c,d=0;for(b.sort(function(a,b){return b.d==a.d?a.f-b.f:b.d-a.d}),a=0;a<b.length;a++)if(b[a].d>c){var e=b[a].d;b[a].d=c,d+=g-(1<<f-e)}else break;for(d>>>=f-c;d>0;){var e=b[a].d;e<c?(b[a].d++,d-=1<<c-e-1):a++}for(;a>=0;a--)b[a].d==c&&d<0&&(b[a].d--,d++);0!=d&&console.log("debt left")},UZIP.F._goodIndex=function(b,c){var a=0;return c[16|a]<=b&&(a|=16),c[8|a]<=b&&(a|=8),c[4|a]<=b&&(a|=4),c[2|a]<=b&&(a|=2),c[1|a]<=b&&(a|=1),a},UZIP.F._writeLit=function(a,b,d,c){return UZIP.F._putsF(d,c,b[a<<1]),c+b[(a<<1)+1]},UZIP.F.inflate=function(e,c){var k,l,s=Uint8Array;if(3==e[0]&&0==e[1])return c||new s(0);var f=UZIP.F,t=f._bitsF,i=f._bitsE,K=f._decodeTiny,u=f.makeCodes,v=f.codes2map,G=f._get17,b=f.U,m=null==c;m&&(c=new s(e.length>>>2<<3));for(var H=0,n=0,o=0,w=0,x=0,y=0,z=0,d=0,a=0;0==H;){if(H=t(e,a,1),n=t(e,a+1,2),a+=3,0==n){(7&a)!=0&&(a+=8-(7&a));var p=(a>>>3)+4,q=e[p-4]|e[p-3]<<8;m&&(c=UZIP.F._check(c,d+q)),c.set(new s(e.buffer,e.byteOffset+p,q),d),a=p+q<<3,d+=q;continue}if(m&&(c=UZIP.F._check(c,d+131072)),1==n&&(k=b.flmap,l=b.fdmap,y=511,z=31),2==n){o=i(e,a,5)+257,w=i(e,a+5,5)+1,x=i(e,a+10,4)+4,a+=14;for(var M=a,g=0;g<38;g+=2)b.itree[g]=0,b.itree[g+1]=0;for(var j=1,g=0;g<x;g++){var A=i(e,a+3*g,3);b.itree[(b.ordr[g]<<1)+1]=A,A>j&&(j=A)}a+=3*x,u(b.itree,j),v(b.itree,j,b.imap),k=b.lmap,l=b.dmap,a=K(b.imap,(1<<j)-1,o+w,e,a,b.ttree);var B=f._copyOut(b.ttree,0,o,b.ltree);y=(1<<B)-1;var C=f._copyOut(b.ttree,o,w,b.dtree);z=(1<<C)-1,u(b.ltree,B),v(b.ltree,B,k),u(b.dtree,C),v(b.dtree,C,l)}for(;;){var I=k[G(e,a)&y];a+=15&I;var h=I>>>4;if(h>>>8==0)c[d++]=h;else if(256==h)break;else{var D=d+h-254;if(h>264){var E=b.ldef[h-257];D=d+(E>>>3)+i(e,a,7&E),a+=7&E}var J=l[G(e,a)&z];a+=15&J;var L=J>>>4,F=b.ddef[L],r=(F>>>4)+t(e,a,15&F);for(a+=15&F,m&&(c=UZIP.F._check(c,d+131072));d<D;)c[d]=c[(d++)-r],c[d]=c[(d++)-r],c[d]=c[(d++)-r],c[d]=c[(d++)-r];d=D}}}return c.length==d?c:c.slice(0,d)},UZIP.F._check=function(a,b){var c=a.length;if(b<=c)return a;var d=new Uint8Array(Math.max(c<<1,b));return d.set(a,0),d},UZIP.F._decodeTiny=function(j,k,l,d,a,f){for(var g=UZIP.F._bitsE,m=UZIP.F._get17,b=0;b<l;){var h=j[m(d,a)&k];a+=15&h;var c=h>>>4;if(c<=15)f[b]=c,b++;else{var i=0,e=0;16==c?(e=3+g(d,a,2),a+=2,i=f[b-1]):17==c?(e=3+g(d,a,3),a+=3):18==c&&(e=11+g(d,a,7),a+=7);for(var n=b+e;b<n;)f[b]=i,b++}}return a},UZIP.F._copyOut=function(e,f,g,b){for(var c=0,a=0,h=b.length>>>1;a<g;){var d=e[a+f];b[a<<1]=0,b[(a<<1)+1]=d,d>c&&(c=d),a++}for(;a<h;)b[a<<1]=0,b[(a<<1)+1]=0,a++;return c},UZIP.F.makeCodes=function(d,i){for(var e,b,c,a,g,j=UZIP.F.U,k=d.length,f=j.bl_count,a=0;a<=i;a++)f[a]=0;for(a=1;a<k;a+=2)f[d[a]]++;var h=j.next_code;for(b=1,e=0,f[0]=0;b<=i;b++)e=e+f[b-1]<<1,h[b]=e;for(c=0;c<k;c+=2)0!=(g=d[c+1])&&(d[c]=h[g],h[g]++)},UZIP.F.codes2map=function(b,d,g){for(var h=b.length,i=UZIP.F.U.rev15,a=0;a<h;a+=2)if(0!=b[a+1])for(var j=a>>1,e=b[a+1],k=j<<4|e,f=d-e,c=b[a]<<f,l=c+(1<<f);c!=l;)g[i[c]>>>15-d]=k,c++},UZIP.F.revCodes=function(b,c){for(var d=UZIP.F.U.rev15,e=15-c,a=0;a<b.length;a+=2){var f=b[a]<<c-b[a+1];b[a]=d[f]>>>e}},UZIP.F._putsE=function(b,c,a){a<<=7&c;var d=c>>>3;b[d]|=a,b[d+1]|=a>>>8},UZIP.F._putsF=function(b,d,a){a<<=7&d;var c=d>>>3;b[c]|=a,b[c+1]|=a>>>8,b[c+2]|=a>>>16},UZIP.F._bitsE=function(b,a,c){return(b[a>>>3]|b[(a>>>3)+1]<<8)>>>(7&a)&(1<<c)-1},UZIP.F._bitsF=function(b,a,c){return(b[a>>>3]|b[(a>>>3)+1]<<8|b[(a>>>3)+2]<<16)>>>(7&a)&(1<<c)-1},UZIP.F._get17=function(b,a){return(b[a>>>3]|b[(a>>>3)+1]<<8|b[(a>>>3)+2]<<16)>>>(7&a)},UZIP.F._get25=function(b,a){return(b[a>>>3]|b[(a>>>3)+1]<<8|b[(a>>>3)+2]<<16|b[(a>>>3)+3]<<24)>>>(7&a)},UZIP.F.U=function(){var a=Uint16Array,b=Uint32Array;return{next_code:new a(16),bl_count:new a(16),ordr:[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],of0:[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,999,999,999],exb:[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0],ldef:new a(32),df0:[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,65535,65535],dxb:[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0],ddef:new b(32),flmap:new a(512),fltree:[],fdmap:new a(32),fdtree:[],lmap:new a(32768),ltree:[],ttree:[],dmap:new a(32768),dtree:[],imap:new a(512),itree:[],rev15:new a(32768),lhst:new b(286),dhst:new b(30),ihst:new b(19),lits:new b(15e3),strt:new a(65536),prev:new a(32768)}}(),function(){for(var a=UZIP.F.U,b=0;b<32768;b++){var c=b;c=(4278255360&(c=(4042322160&(c=(3435973836&(c=(2863311530&c)>>>1|(1431655765&c)<<1))>>>2|(858993459&c)<<2))>>>4|(252645135&c)<<4))>>>8|(16711935&c)<<8,a.rev15[b]=(c>>>16|c<<16)>>>17}function d(a,b,c){for(;0!=b--;)a.push(0,c)}for(var b=0;b<32;b++)a.ldef[b]=a.of0[b]<<3|a.exb[b],a.ddef[b]=a.df0[b]<<4|a.dxb[b];d(a.fltree,144,8),d(a.fltree,112,9),d(a.fltree,24,7),d(a.fltree,8,8),UZIP.F.makeCodes(a.fltree,9),UZIP.F.codes2map(a.fltree,9,a.flmap),UZIP.F.revCodes(a.fltree,9),d(a.fdtree,32,5),UZIP.F.makeCodes(a.fdtree,5),UZIP.F.codes2map(a.fdtree,5,a.fdmap),UZIP.F.revCodes(a.fdtree,5),d(a.itree,19,0),d(a.ltree,286,0),d(a.dtree,30,0),d(a.ttree,320,0)}();export default UZIP