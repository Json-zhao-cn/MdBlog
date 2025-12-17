import{_ as s,c as e,a,o as i}from"./app-Clf_e-qu.js";const l={};function d(c,n){return i(),e("div",null,[...n[0]||(n[0]=[a(`<h2 id="using-groovy-to-add-delay-after-splitjson" tabindex="-1"><a class="header-anchor" href="#using-groovy-to-add-delay-after-splitjson"><span><strong>Using groovy to add delay after splitJson</strong></span></a></h2><h3 id="_1-scenario" tabindex="-1"><a class="header-anchor" href="#_1-scenario"><span>1. <strong>Scenario</strong></span></a></h3><p>When we use Apache NIFI to sync source db table to target db. If we meet some complicated scenarios. Such as: we will get the parent data, then, using each parent data to get child data.We will use <code>splitJso</code> processor to do it. However, if we use <code>PutSQL</code> or <code>PutDatabaseRecord</code>, we want to control the queue speed. However, it is so hard to add delay when we use the native component.According to this situation, we can use <code>groovy</code> to add customer dealy time in your queue.</p><h3 id="_2-solution" tabindex="-1"><a class="header-anchor" href="#_2-solution"><span>2. <strong>Solution</strong></span></a></h3><p>After splitJson, add delay for each queue</p><div class="language-Groovy line-numbers-mode" data-highlighter="prismjs" data-ext="Groovy" data-title="Groovy"><pre><code><span class="line">import groovy.json.JsonSlurper</span>
<span class="line">import org.apache.nifi.processor.io.InputStreamCallback</span>
<span class="line">import java.util.concurrent.TimeUnit</span>
<span class="line"></span>
<span class="line">def flowFile = session.get()</span>
<span class="line">if (!flowFile) return</span>
<span class="line"></span>
<span class="line">try {</span>
<span class="line">    // --- Read JSON content ---</span>
<span class="line">    String jsonText = &#39;&#39;</span>
<span class="line">    session.read(flowFile, { inputStream -&gt;</span>
<span class="line">        jsonText = inputStream.getText(&#39;UTF-8&#39;)</span>
<span class="line">    } as InputStreamCallback)</span>
<span class="line"></span>
<span class="line">    // --- Parse JSON ---</span>
<span class="line">    def json = new JsonSlurper().parseText(jsonText)</span>
<span class="line">    int index = (json?.index ?: 0) as int</span>
<span class="line"></span>
<span class="line">    // --- Calculate dynamic delay ---</span>
<span class="line">    long delayMs = calculateDelay(index)</span>
<span class="line"></span>
<span class="line">    if (delayMs &gt; 0) {</span>
<span class="line">        log.warn(&quot;Each queue | Processing index \${index}, delaying \${delayMs} ms&quot;)</span>
<span class="line">        sleepSafely(delayMs)</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    session.transfer(flowFile, REL_SUCCESS)</span>
<span class="line"></span>
<span class="line">} catch (Exception e) {</span>
<span class="line">    log.error(&quot;Error processing flowFile&quot;, e)</span>
<span class="line">    session.transfer(flowFile, REL_FAILURE)</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">/**</span>
<span class="line"> * Calculates increasing delay:</span>
<span class="line"> * index &lt; 8  ? 0ms</span>
<span class="line"> * every +8 index ? +0.5 sec</span>
<span class="line"> * max delay       ? 5 sec</span>
<span class="line"> */</span>
<span class="line">long calculateDelay(int index) {</span>
<span class="line">    if (index &lt; 8) return 0</span>
<span class="line"></span>
<span class="line">    int delaySegment = ((index - 8) / 10) + 1</span>
<span class="line">    double delaySeconds = delaySegment * 0.5</span>
<span class="line"></span>
<span class="line">    // Cap max delay to 5 sec</span>
<span class="line">    delaySeconds = Math.min(delaySeconds, 5.0)</span>
<span class="line"></span>
<span class="line">    return (long)(delaySeconds * 1000)</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">/**</span>
<span class="line"> * Safer sleep wrapper (avoids interrupted exceptions breaking NiFi)</span>
<span class="line"> */</span>
<span class="line">void sleepSafely(long ms) {</span>
<span class="line">    try {</span>
<span class="line">        Thread.sleep(ms)</span>
<span class="line">    } catch (InterruptedException ie) {</span>
<span class="line">        log.warn(&quot;Sleep interrupted: \${ie.message}&quot;)</span>
<span class="line">        Thread.currentThread().interrupt()</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-summarize" tabindex="-1"><a class="header-anchor" href="#_3-summarize"><span>3. <strong>Summarize</strong></span></a></h3><ol><li>You can use <code>PutAttribute</code> to customize your <code>index group</code> and <code>delay time</code>. It is easy to duplicate to another group.</li></ol>`,8)])])}const o=s(l,[["render",d]]),t=JSON.parse('{"path":"/blogs/ETL/AppacheNIFI/Groovy/QueueDelay.html","title":"Using groovy to add delay after splitJson","lang":"en-US","frontmatter":{"title":"Using groovy to add delay after splitJson","date":"2025/11/25","tags":["ApacheNIFI"],"categories":["ETL"]},"headers":[{"level":2,"title":"Using groovy to add delay after splitJson","slug":"using-groovy-to-add-delay-after-splitjson","link":"#using-groovy-to-add-delay-after-splitjson","children":[{"level":3,"title":"1. Scenario","slug":"_1-scenario","link":"#_1-scenario","children":[]},{"level":3,"title":"2. Solution","slug":"_2-solution","link":"#_2-solution","children":[]},{"level":3,"title":"3. Summarize","slug":"_3-summarize","link":"#_3-summarize","children":[]}]}],"git":{"createdTime":1764052278000,"updatedTime":1764052278000,"contributors":[{"name":"jsonzhao","email":"json.zhao.cn@outlook.com","commits":1}]},"filePathRelative":"blogs/ETL/AppacheNIFI/Groovy/QueueDelay.md"}');export{o as comp,t as data};
