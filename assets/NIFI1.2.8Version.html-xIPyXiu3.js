import{_ as o,a as t,b as r,c as d}from"./NifiHome-BFiJ0saZ.js";import{_ as p,c,b as e,a as l,d as s,e as a,r as u,o as v}from"./app-Clf_e-qu.js";const m={},h={href:"https://nifi.apache.org/",target:"_blank",rel:"noopener noreferrer"},f={href:"https://archive.apache.org/dist/nifi/",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.youtube.com/watch?v=EPp8PXWViyo",target:"_blank",rel:"noopener noreferrer"},g={href:"https://www.oracle.com/java/technologies/downloads/archive/",target:"_blank",rel:"noopener noreferrer"},I={start:"3"},w={href:"https:localhost:8443/nifi/",target:"_blank",rel:"noopener noreferrer"};function A(_,n){const i=u("ExternalLinkIcon");return v(),c("div",null,[n[23]||(n[23]=e("h2",{id:"how-to-download-and-run-the-apache-nifi-1-28-version",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#how-to-download-and-run-the-apache-nifi-1-28-version"},[e("span",null,[e("strong",null,"How to download and run the Apache NIFI 1.28 Version")])])],-1)),n[24]||(n[24]=e("h3",{id:"_1-download-the-apache-nifi-version-2-3-0",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-download-the-apache-nifi-version-2-3-0"},[e("span",null,[s("1. "),e("strong",null,"Download the Apache NIFI version 2.3.0")])])],-1)),e("ul",null,[e("li",null,[n[1]||(n[1]=s("Open ",-1)),e("a",h,[n[0]||(n[0]=s("nifi official website",-1)),a(i)]),n[2]||(n[2]=s(", click ",-1)),n[3]||(n[3]=e("code",null,"download",-1)),n[4]||(n[4]=s(",you can download the latest version 2,current is ",-1)),n[5]||(n[5]=e("code",null,"2.6.0",-1)),n[6]||(n[6]=s(", and the latest version 1,",-1)),n[7]||(n[7]=e("code",null,"NIFI-1.28.1",-1)),n[8]||(n[8]=s(";",-1))]),e("li",null,[n[10]||(n[10]=s("If you want to download the archieve version,",-1)),e("a",f,[n[9]||(n[9]=s("NIFI archieve",-1)),a(i)]),n[11]||(n[11]=s(" to choose your version, I select the ",-1)),n[12]||(n[12]=e("code",null,"2.3.0",-1)),n[13]||(n[13]=s(";",-1))]),e("li",null,[e("a",b,[n[14]||(n[14]=s("Video Link",-1)),a(i)])])]),n[25]||(n[25]=e("hr",null,null,-1)),n[26]||(n[26]=e("h3",{id:"_2-download-the-java-version",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_2-download-the-java-version"},[e("span",null,[s("2. "),e("strong",null,"Download the java-version")])])],-1)),e("ol",null,[n[18]||(n[18]=e("li",null,[s("In the apache nifi "),e("code",null,"version 2.x"),s(",you need to download the "),e("code",null,"java-21"),s(" and "),e("code",null,"Python 3.10 or higher")],-1)),n[19]||(n[19]=e("li",null,[s("In the apache nifi "),e("code",null,"version 1.28.1"),s(", you need to download "),e("code",null,"java 17")],-1)),e("li",null,[n[16]||(n[16]=s("Open ",-1)),e("a",g,[n[15]||(n[15]=s("Java_archieve",-1)),a(i)]),n[17]||(n[17]=s(" to download your wanted java version;",-1))])]),n[27]||(n[27]=l(`<hr><h3 id="_3-nifi-configuration" tabindex="-1"><a class="header-anchor" href="#_3-nifi-configuration"><span>3. <strong>NIFI Configuration</strong></span></a></h3><ol><li><code>nifi.properties</code></li></ol><ul><li>nifi.flow.configuration.archive.max.time=15 days<br> change nifi.flow.configuration.archive.max.time as 15 days, I think 15 days is enough.</li><li>nifi.queue.backpressure.size=2 GB 2G is good for you to sync large data when you use executedSQL.</li><li>command the <code>nifi.web.http</code> config</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line"># nifi.web.http.host=</span>
<span class="line"># nifi.web.http.port=</span>
<span class="line"># nifi.web.http.network.interface.default=</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><code>bootstrap.conf</code></li></ol><ul><li>JVM memory settings</li><li>2.1 for production environment:</li><li><ul><li>Setting the minimum running memory as 50% your windows running memory is better.</li></ul></li><li><ul><li>Setting the maximum running memory as 75%-85% your windows running memory is better.</li></ul></li><li>2.2 for dev environment:</li><li><ul><li>follow my setting is okay.</li></ul></li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line"># JVM memory settings</span>
<span class="line">java.arg.2=-Xms4g</span>
<span class="line">java.arg.3=-Xmx8g</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li><code>nifi-env.cmd</code> replace the <code>nifi-env.cmd</code>content</li></ol><div class="language-ps line-numbers-mode" data-highlighter="prismjs" data-ext="ps" data-title="ps"><pre><code><span class="line">@echo off</span>
<span class="line">rem Set Java version</span>
<span class="line">rem if you have multiple java version, use the fully path to do it.</span>
<span class="line">set JAVA_HOME=&quot;C:\\Program Files\\Java\\jdk-17&quot; </span>
<span class="line"></span>
<span class="line">rem Set application home directory</span>
<span class="line">set NIFI_HOME=&quot;E:\\SoftWare\\ApacheNIFI\\nifi-1.28.1&quot;</span>
<span class="line"></span>
<span class="line">rem Set run directory for process identifier tracking</span>
<span class="line">set NIFI_PID_DIR=%NIFI_HOME%\\run</span>
<span class="line"></span>
<span class="line">rem Set application log directory</span>
<span class="line">set NIFI_LOG_DIR=%NIFI_HOME%\\logs</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li><code>nifi.cmd</code> replace the <code>nifi.cmd</code> content</li></ol><div class="language-ps line-numbers-mode" data-highlighter="prismjs" data-ext="ps" data-title="ps"><pre><code><span class="line">@echo off</span>
<span class="line"></span>
<span class="line">rem set JAVA_EXE and NIFI_HOME directory</span>
<span class="line">set JAVA_EXE=C:\\Program Files\\Java\\jdk-17\\bin\\java.exe</span>
<span class="line">set NIFI_HOME=E:\\SoftWare\\ApacheNIFI\\nifi-1.28.1</span>
<span class="line"></span>
<span class="line">echo Checking Java installation...</span>
<span class="line">if not exist &quot;%JAVA_EXE%&quot; (</span>
<span class="line">    echo ERROR: Java not found at %JAVA_EXE%</span>
<span class="line">    pause</span>
<span class="line">    exit /b 1</span>
<span class="line">)</span>
<span class="line"></span>
<span class="line">echo Checking NiFi installation...</span>
<span class="line">if not exist &quot;%NIFI_HOME%&quot; (</span>
<span class="line">    echo ERROR: NiFi home not found at %NIFI_HOME%</span>
<span class="line">    pause</span>
<span class="line">    exit /b 1</span>
<span class="line">)</span>
<span class="line"></span>
<span class="line">set BOOTSTRAP_LIB_DIR=%NIFI_HOME%\\lib\\bootstrap</span>
<span class="line">set CONF_DIR=%NIFI_HOME%\\conf</span>
<span class="line">set NIFI_LOG_DIR=%NIFI_HOME%\\logs</span>
<span class="line"></span>
<span class="line">set LOG_DIR_PROPERTY=-Dorg.apache.nifi.bootstrap.config.log.dir=%NIFI_LOG_DIR%</span>
<span class="line">set CONFIG_FILE_PROPERTY=-Dorg.apache.nifi.bootstrap.config.file=%CONF_DIR%\\bootstrap.conf</span>
<span class="line">set PROPERTIES_FILE_PROPERTY=-Dnifi.properties.file.path=%CONF_DIR%\\nifi.properties</span>
<span class="line">set BOOTSTRAP_HEAP_SIZE=48m</span>
<span class="line"></span>
<span class="line">set JAVA_ARGS=%LOG_DIR_PROPERTY% %CONFIG_FILE_PROPERTY%</span>
<span class="line">set JAVA_PARAMS=-cp &quot;%BOOTSTRAP_LIB_DIR%\\*;%CONF_DIR%&quot; %JAVA_ARGS%</span>
<span class="line">set JAVA_MEMORY=-Xms%BOOTSTRAP_HEAP_SIZE% -Xmx%BOOTSTRAP_HEAP_SIZE%</span>
<span class="line"></span>
<span class="line">echo Starting NiFi...</span>
<span class="line">pushd &quot;%NIFI_HOME%&quot;</span>
<span class="line"></span>
<span class="line">set RUN_COMMAND=%~1</span>
<span class="line">if &quot;%RUN_COMMAND%&quot; == &quot;&quot; set RUN_COMMAND=run</span>
<span class="line"></span>
<span class="line">if &quot;%RUN_COMMAND%&quot; == &quot;start&quot; (</span>
<span class="line">    start /MIN &quot;Apache NiFi&quot; &quot;%JAVA_EXE%&quot; %JAVA_MEMORY% %JAVA_PARAMS% org.apache.nifi.bootstrap.BootstrapProcess %RUN_COMMAND%</span>
<span class="line">) else (</span>
<span class="line">    &quot;%JAVA_EXE%&quot; %JAVA_MEMORY% %JAVA_PARAMS% org.apache.nifi.bootstrap.BootstrapProcess %RUN_COMMAND%</span>
<span class="line">)</span>
<span class="line"></span>
<span class="line">popd</span>
<span class="line">pause</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_4-run-nifi" tabindex="-1"><a class="header-anchor" href="#_4-run-nifi"><span>4. <strong>run nifi</strong></span></a></h3><ol><li>cd the nifi bin folder</li><li>run the cmd command</li></ol><div class="language-ps line-numbers-mode" data-highlighter="prismjs" data-ext="ps" data-title="ps"><pre><code><span class="line">nifi.cmd start</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="`+o+'" alt="start nifi"></p>',17)),e("ol",I,[e("li",null,[n[21]||(n[21]=s("go to the ",-1)),e("a",w,[n[20]||(n[20]=s("nifi web home",-1)),a(i)]),n[22]||(n[22]=s(",you will see the nifi-login screen",-1))])]),n[28]||(n[28]=l('<p><img src="'+t+`" alt="nifi login"></p><ol start="4"><li>find the <code>user</code> and <code>password</code> in the <code>nifi-app.log</code> file find the <code>Generated Username</code> in the <code>nifi-app.log</code> file</li></ol><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">Generated Username [a4b8e1c1-4235-4b78-935c-81d2221e10e9]</span>
<span class="line">Generated Password [sfiElxVoB1DsfOSQTC2r4xVdqseo90lg]</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+r+'" alt="finduser"></p><p><code>copy and save the user</code></p><ol start="5"><li>login,you will see the nifi home screen, you can start you nifi journey now.</li></ol><p><img src="'+d+'" alt="nifihome"></p>',7))])}const O=p(m,[["render",A]]),R=JSON.parse('{"path":"/blogs/ETL/AppacheNIFI/Download/NIFI1.2.8Version.html","title":"How to download and run the Apache NIFI 1.28 Version","lang":"en-US","frontmatter":{"title":"How to download and run the Apache NIFI 1.28 Version","date":"2025/11/11","tags":["ApacheNIFI"],"categories":["ETL"]},"headers":[{"level":2,"title":"How to download and run the Apache NIFI 1.28 Version","slug":"how-to-download-and-run-the-apache-nifi-1-28-version","link":"#how-to-download-and-run-the-apache-nifi-1-28-version","children":[{"level":3,"title":"1. Download the Apache NIFI version 2.3.0","slug":"_1-download-the-apache-nifi-version-2-3-0","link":"#_1-download-the-apache-nifi-version-2-3-0","children":[]},{"level":3,"title":"2. Download the java-version","slug":"_2-download-the-java-version","link":"#_2-download-the-java-version","children":[]},{"level":3,"title":"3. NIFI Configuration","slug":"_3-nifi-configuration","link":"#_3-nifi-configuration","children":[]},{"level":3,"title":"4. run nifi","slug":"_4-run-nifi","link":"#_4-run-nifi","children":[]}]}],"git":{"createdTime":1762950152000,"updatedTime":1765347813000,"contributors":[{"name":"json zhao","email":"json.zhao.cn@outlook.com","commits":2},{"name":"jsonzhao","email":"json.zhao.cn@outlook.com","commits":2}]},"filePathRelative":"blogs/ETL/AppacheNIFI/Download/NIFI1.2.8Version.md"}');export{O as comp,R as data};
