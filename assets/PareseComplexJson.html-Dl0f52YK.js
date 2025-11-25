import{_ as s,c as a,a as p,o as t}from"./app-BCAoB5MR.js";const e={};function o(l,n){return t(),a("div",null,[...n[0]||(n[0]=[p(`<h2 id="using-groovy-to-parse-complex-json" tabindex="-1"><a class="header-anchor" href="#using-groovy-to-parse-complex-json"><span><strong>Using groovy to parse complex Json</strong></span></a></h2><h3 id="_1-scenario" tabindex="-1"><a class="header-anchor" href="#_1-scenario"><span>1. <strong>Scenario</strong></span></a></h3><p>In the Apache NIFI context, we get complex Json after <code>InvokeHTTP</code> process. We can not use the original Json, we need to <code>parse</code>, <code>transform</code> this Json to the customer business Json. We can use groovy script to realize it.</p><h3 id="_2-requirement" tabindex="-1"><a class="header-anchor" href="#_2-requirement"><span>2. <strong>Requirement</strong></span></a></h3><ul><li>The Json data</li></ul><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;WipOrder&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">&quot;WipOrderdata&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token property">&quot;WipOrderid&quot;</span><span class="token operator">:</span> <span class="token string">&quot;11162&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                <span class="token property">&quot;WorkOrder&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Order568&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                <span class="token property">&quot;Shipping&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span></span>
<span class="line">            <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">&quot;WipOrderNos&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token property">&quot;nos&quot;</span><span class="token operator">:</span> <span class="token string">&quot;E1&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;nosclass&quot;</span><span class="token operator">:</span> <span class="token string">&quot;E1&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;nosdescription&quot;</span><span class="token operator">:</span> <span class="token string">&quot;PCB&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;serialno&quot;</span><span class="token operator">:</span> <span class="token string">&quot;8650979V01&quot;</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">&quot;WipOrderdates&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token property">&quot;WipOrderdatetype&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ABC&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;WipOrderdate&quot;</span><span class="token operator">:</span> <span class="token string">&quot;20251219 00:00:00&quot;</span></span>
<span class="line">                <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">                <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token property">&quot;WipOrderdatetype&quot;</span><span class="token operator">:</span> <span class="token string">&quot;EFC&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;WipOrderdate&quot;</span><span class="token operator">:</span> <span class="token string">&quot;20251212 00:00:00&quot;</span></span>
<span class="line">                <span class="token punctuation">}</span>     </span>
<span class="line">            <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">&quot;weights&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token property">&quot;tareweight&quot;</span><span class="token operator">:</span> <span class="token string">&quot;9279001&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;loadweight&quot;</span><span class="token operator">:</span> <span class="token string">&quot;36721.90&quot;</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">&quot;Orderinfo&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token property">&quot;Ordermarkingpart&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                        <span class="token punctuation">{</span></span>
<span class="line">                            <span class="token property">&quot;component&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Order_component_marking_001&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                            <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Order_marking_axle_gear&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                            <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;R756&quot;</span></span>
<span class="line">                        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">                        <span class="token punctuation">{</span></span>
<span class="line">                            <span class="token property">&quot;component&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Order_component_marking_and_retarder&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                            <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Order_marking_pos_4&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                            <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;C&quot;</span></span>
<span class="line">                        <span class="token punctuation">}</span></span>
<span class="line">                    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;Ordercertificatepart&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;Ordercertificateref&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">&quot;ExternalCustomer&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token property">&quot;Customerparts&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">&quot;orderSpec&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token property">&quot;varclass&quot;</span><span class="token operator">:</span> <span class="token string">&quot;FPC&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;varfam&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;varopt&quot;</span><span class="token operator">:</span> <span class="token string">&quot;A&quot;</span></span>
<span class="line">                <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">                <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token property">&quot;varclass&quot;</span><span class="token operator">:</span> <span class="token string">&quot;FPC&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;varfam&quot;</span><span class="token operator">:</span> <span class="token string">&quot;9968&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;varopt&quot;</span><span class="token operator">:</span> <span class="token string">&quot;A&quot;</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">&quot;OrderDetail&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token property">&quot;OrderId&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1208922&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;PA&quot;</span><span class="token operator">:</span> <span class="token string">&quot;T1P11&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;cuobj&quot;</span><span class="token operator">:</span> <span class="token string">&quot;10088&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;pfipo&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1208837&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;synctime&quot;</span><span class="token operator">:</span> <span class="token string">&quot;20251201 00:00:00&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;plstart&quot;</span><span class="token operator">:</span> <span class="token string">&quot;20251117 17:07:39&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;ppatoo&quot;</span><span class="token operator">:</span> <span class="token string">&quot;PA&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;ppaobj&quot;</span><span class="token operator">:</span> <span class="token string">&quot;T1P11&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;plstatus&quot;</span><span class="token operator">:</span> <span class="token string">&quot;E&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;invest&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;assstatus&quot;</span><span class="token operator">:</span> <span class="token string">&quot;F&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;mtrlstatus&quot;</span><span class="token operator">:</span> <span class="token string">&quot;S&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;delistatus&quot;</span><span class="token operator">:</span> <span class="token string">&quot;D&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;remtxt&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;frozen&quot;</span><span class="token operator">:</span> <span class="token string">&quot;N&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;ipocpaobj&quot;</span><span class="token operator">:</span> <span class="token string">&quot;T1&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;cuseq&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;ciid_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;683268&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;contracts&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                        <span class="token punctuation">{</span></span>
<span class="line">                            <span class="token property">&quot;wpl&quot;</span><span class="token operator">:</span> <span class="token string">&quot;001&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                            <span class="token property">&quot;contract&quot;</span><span class="token operator">:</span> <span class="token string">&quot;50893&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                            <span class="token property">&quot;typetexts&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line"></span>
<span class="line">                            <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">                            <span class="token property">&quot;barcodes&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line"></span>
<span class="line">                            <span class="token punctuation">]</span></span>
<span class="line">                        <span class="token punctuation">}</span></span>
<span class="line">                    <span class="token punctuation">]</span></span>
<span class="line">                <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">                <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token property">&quot;OrderId&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1208981&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;PA&quot;</span><span class="token operator">:</span> <span class="token string">&quot;T1P07A&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;cuobj&quot;</span><span class="token operator">:</span> <span class="token string">&quot;10107&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;pfipo&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1208901&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;synctime&quot;</span><span class="token operator">:</span> <span class="token string">&quot;20251201 00:00:00&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;plstart&quot;</span><span class="token operator">:</span> <span class="token string">&quot;20251117 17:11:19&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;ppatoo&quot;</span><span class="token operator">:</span> <span class="token string">&quot;PA&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;ppaobj&quot;</span><span class="token operator">:</span> <span class="token string">&quot;T1P07A&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;plstatus&quot;</span><span class="token operator">:</span> <span class="token string">&quot;E&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;invest&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;assstatus&quot;</span><span class="token operator">:</span> <span class="token string">&quot;F&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;mtrlstatus&quot;</span><span class="token operator">:</span> <span class="token string">&quot;S&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;delistatus&quot;</span><span class="token operator">:</span> <span class="token string">&quot;D&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;remtxt&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;frozen&quot;</span><span class="token operator">:</span> <span class="token string">&quot;N&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;ipocpaobj&quot;</span><span class="token operator">:</span> <span class="token string">&quot;T1P07&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;cuseq&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;ciid_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;696375&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token property">&quot;contracts&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                        <span class="token punctuation">{</span></span>
<span class="line">                            <span class="token property">&quot;wpl&quot;</span><span class="token operator">:</span> <span class="token string">&quot;0078&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                            <span class="token property">&quot;contract&quot;</span><span class="token operator">:</span> <span class="token string">&quot;50388&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                            <span class="token property">&quot;typetexts&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                                <span class="token punctuation">{</span></span>
<span class="line">                                    <span class="token property">&quot;typedes&quot;</span><span class="token operator">:</span> <span class="token string">&quot;17&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                                    <span class="token property">&quot;desname&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Espec. Order568&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                                    <span class="token property">&quot;typetext&quot;</span><span class="token operator">:</span> <span class="token string">&quot;R136 A 6X2   NA____3350 CBU&quot;</span></span>
<span class="line">                                <span class="token punctuation">}</span></span>
<span class="line">                            <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">                            <span class="token property">&quot;barcodes&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line"></span>
<span class="line">                            <span class="token punctuation">]</span></span>
<span class="line">                        <span class="token punctuation">}</span></span>
<span class="line">                    <span class="token punctuation">]</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">]</span></span>
<span class="line">            </span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>Requirement</code></li><li><ol><li>Only keep <code>WipOrder</code> Json.</li></ol></li><li><ol start="2"><li>Each <code>WipOrder</code> Child Json should have <code>Product_Id</code> and <code>Popid</code> fields, which come from the context.</li></ol></li><li><ol start="3"><li>Using <code>Ordermarkingpart</code> to replace<code>Orderinfo</code></li></ol></li><li><ol start="4"><li><code>ExternalCustomer</code> should be removed</li></ol></li><li><ol start="5"><li><code>orderSpec</code> should add <code>Name</code> filed, the value = <code>orderSpec.</code></li></ol></li><li><ol start="6"><li><code>OrderDetail.contracts</code> should be null</li></ol></li></ul><h3 id="_3-solution" tabindex="-1"><a class="header-anchor" href="#_3-solution"><span>3. <strong>Solution</strong></span></a></h3><p>According to the requirement, the following is groovy script</p><div class="language-groovy line-numbers-mode" data-highlighter="prismjs" data-ext="groovy" data-title="groovy"><pre><code><span class="line"><span class="token keyword">import</span> groovy<span class="token punctuation">.</span>json<span class="token punctuation">.</span>JsonSlurper</span>
<span class="line"><span class="token keyword">import</span> groovy<span class="token punctuation">.</span>json<span class="token punctuation">.</span>JsonOutput</span>
<span class="line"><span class="token keyword">import</span> org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>nifi<span class="token punctuation">.</span>processor<span class="token punctuation">.</span>io<span class="token punctuation">.</span>InputStreamCallback</span>
<span class="line"><span class="token keyword">import</span> org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>nifi<span class="token punctuation">.</span>processor<span class="token punctuation">.</span>io<span class="token punctuation">.</span>OutputStreamCallback</span>
<span class="line"><span class="token keyword">import</span> java<span class="token punctuation">.</span>nio<span class="token punctuation">.</span>charset<span class="token punctuation">.</span>StandardCharsets</span>
<span class="line"></span>
<span class="line"><span class="token keyword">def</span> flowFile <span class="token operator">=</span> session<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>flowFile<span class="token punctuation">)</span> <span class="token keyword">return</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">def</span> jsonText <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;&quot;</span></span></span>
<span class="line">    session<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>flowFile<span class="token punctuation">,</span> <span class="token punctuation">{</span> inputStream <span class="token operator">-&gt;</span></span>
<span class="line">        jsonText <span class="token operator">=</span> inputStream<span class="token punctuation">.</span><span class="token function">getText</span><span class="token punctuation">(</span>StandardCharsets<span class="token punctuation">.</span>UTF_8<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">as</span> InputStreamCallback<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">def</span> Product_Id <span class="token operator">=</span> flowFile<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;Product_Id&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">def</span> Popid <span class="token operator">=</span> flowFile<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;Popid&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    flowFile <span class="token operator">=</span> session<span class="token punctuation">.</span><span class="token function">putAttribute</span><span class="token punctuation">(</span>flowFile<span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;NoWipOrderData&quot;</span></span><span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;false&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>jsonText<span class="token operator">?.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        flowFile <span class="token operator">=</span> session<span class="token punctuation">.</span><span class="token function">putAttribute</span><span class="token punctuation">(</span>flowFile<span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;NoWipOrderData&quot;</span></span><span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;true&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        session<span class="token punctuation">.</span><span class="token function">transfer</span><span class="token punctuation">(</span>flowFile<span class="token punctuation">,</span> REL_SUCCESS<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">return</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">def</span> parsed <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JsonSlurper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">parseText</span><span class="token punctuation">(</span>jsonText<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">def</span> epoList <span class="token operator">=</span> parsed<span class="token punctuation">.</span>WipOrder</span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>epoList <span class="token keyword">instanceof</span> <span class="token class-name">List</span><span class="token punctuation">)</span> <span class="token operator">||</span> epoList<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        flowFile <span class="token operator">=</span> session<span class="token punctuation">.</span><span class="token function">putAttribute</span><span class="token punctuation">(</span>flowFile<span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;NoWipOrderData&quot;</span></span><span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;true&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        session<span class="token punctuation">.</span><span class="token function">transfer</span><span class="token punctuation">(</span>flowFile<span class="token punctuation">,</span> REL_SUCCESS<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">return</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">def</span> epo0 <span class="token operator">=</span> epoList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">//-------------------------------------------------------</span></span>
<span class="line">    <span class="token comment">// SAFER DEEP COPY HELPER (Groovy clone() is unreliable)</span></span>
<span class="line">    <span class="token comment">//-------------------------------------------------------</span></span>
<span class="line">    <span class="token keyword">def</span> copyMap <span class="token operator">=</span> <span class="token punctuation">{</span> m <span class="token operator">-&gt;</span> m <span class="token keyword">instanceof</span> <span class="token class-name">Map</span> <span class="token operator">?</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span> <span class="token operator">+</span> m<span class="token punctuation">)</span> <span class="token punctuation">:</span> m <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">//-------------------------------------------------------</span></span>
<span class="line">    <span class="token comment">// BUILD NEW JSON STRUCTURE</span></span>
<span class="line">    <span class="token comment">//-------------------------------------------------------</span></span>
<span class="line">    <span class="token keyword">def</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// WipOrderdata</span></span>
<span class="line">    result<span class="token punctuation">.</span>WipOrderdata <span class="token operator">=</span> <span class="token function">copyMap</span><span class="token punctuation">(</span>epo0<span class="token punctuation">.</span>WipOrderdata <span class="token operator">?:</span> <span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">    result<span class="token punctuation">.</span>WipOrderdata<span class="token punctuation">.</span>Product_Id <span class="token operator">=</span> Product_Id</span>
<span class="line"></span>
<span class="line">    <span class="token comment">// WipOrderNos</span></span>
<span class="line">    result<span class="token punctuation">.</span>WipOrderNos <span class="token operator">=</span> <span class="token punctuation">(</span>epo0<span class="token punctuation">.</span>WipOrderNos <span class="token operator">?:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span>collect <span class="token punctuation">{</span> item <span class="token operator">-&gt;</span></span>
<span class="line">        <span class="token keyword">def</span> newItem <span class="token operator">=</span> <span class="token function">copyMap</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span></span>
<span class="line">        newItem<span class="token punctuation">.</span>Product_Id <span class="token operator">=</span> Product_Id</span>
<span class="line">        newItem<span class="token punctuation">.</span>Popid <span class="token operator">=</span> Popid</span>
<span class="line">        <span class="token keyword">return</span> newItem</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// WipOrderdates</span></span>
<span class="line">    result<span class="token punctuation">.</span>WipOrderdates <span class="token operator">=</span> <span class="token punctuation">(</span>epo0<span class="token punctuation">.</span>WipOrderdates <span class="token operator">?:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span>collect <span class="token punctuation">{</span> item <span class="token operator">-&gt;</span></span>
<span class="line">        <span class="token keyword">def</span> newItem <span class="token operator">=</span> <span class="token function">copyMap</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span></span>
<span class="line">        newItem<span class="token punctuation">.</span>Product_Id <span class="token operator">=</span> Product_Id</span>
<span class="line">        newItem<span class="token punctuation">.</span>Popid <span class="token operator">=</span> Popid</span>
<span class="line">        newItem<span class="token punctuation">.</span>SequenceId <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>newItem<span class="token punctuation">.</span>Product_Individual <span class="token operator">?:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token punctuation">(</span>newItem<span class="token punctuation">.</span>epodatetype <span class="token operator">?:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">return</span> newItem</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Orderinfo ? Ordermarkingpart only</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>epo0<span class="token punctuation">.</span>Orderinfo <span class="token keyword">instanceof</span> <span class="token class-name">List</span> <span class="token operator">&amp;&amp;</span></span>
<span class="line">        epo0<span class="token punctuation">.</span>Orderinfo <span class="token operator">&amp;&amp;</span></span>
<span class="line">        epo0<span class="token punctuation">.</span>Orderinfo<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">?.</span>Ordermarkingpart<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">        result<span class="token punctuation">.</span>Orderinfo <span class="token operator">=</span> epo0<span class="token punctuation">.</span>Orderinfo<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Ordermarkingpart<span class="token punctuation">.</span>collect <span class="token punctuation">{</span> item <span class="token operator">-&gt;</span></span>
<span class="line">            <span class="token keyword">def</span> newItem <span class="token operator">=</span> <span class="token function">copyMap</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span></span>
<span class="line">            newItem<span class="token punctuation">.</span>Product_Id <span class="token operator">=</span> Product_Id</span>
<span class="line">            newItem<span class="token punctuation">.</span>Popid <span class="token operator">=</span> Popid</span>
<span class="line">            newItem<span class="token punctuation">.</span>SequenceId <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>newItem<span class="token punctuation">.</span>Product_Id <span class="token operator">?:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token punctuation">(</span>newItem<span class="token punctuation">.</span>name <span class="token operator">?:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token keyword">return</span> newItem</span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">        result<span class="token punctuation">.</span>Orderinfo <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// weights ? first element only</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>epo0<span class="token punctuation">.</span>weights <span class="token keyword">instanceof</span> <span class="token class-name">List</span> <span class="token operator">&amp;&amp;</span> epo0<span class="token punctuation">.</span>weights<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        result<span class="token punctuation">.</span>weights <span class="token operator">=</span> <span class="token function">copyMap</span><span class="token punctuation">(</span>epo0<span class="token punctuation">.</span>weights<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">        result<span class="token punctuation">.</span>weights<span class="token punctuation">.</span>Product_Id <span class="token operator">=</span> Product_Id</span>
<span class="line">        result<span class="token punctuation">.</span>weights<span class="token punctuation">.</span>Popid <span class="token operator">=</span> Popid</span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">        result<span class="token punctuation">.</span>weights <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// orderSpec</span></span>
<span class="line">    result<span class="token punctuation">.</span>orderSpec <span class="token operator">=</span> <span class="token punctuation">(</span>epo0<span class="token punctuation">.</span>orderSpec <span class="token operator">?:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span>collect <span class="token punctuation">{</span> item <span class="token operator">-&gt;</span></span>
<span class="line">        <span class="token keyword">def</span> newItem <span class="token operator">=</span> <span class="token function">copyMap</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span></span>
<span class="line">        newItem<span class="token punctuation">.</span>Product_Id <span class="token operator">=</span> Product_Id</span>
<span class="line">        newItem<span class="token punctuation">.</span>Popid <span class="token operator">=</span> Popid</span>
<span class="line">        newItem<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>newItem<span class="token punctuation">.</span>Product_Id <span class="token operator">?:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span> <span class="token operator">+</span><span class="token punctuation">(</span>newItem<span class="token punctuation">.</span>varfam <span class="token operator">?:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token punctuation">(</span>newItem<span class="token punctuation">.</span>varopt <span class="token operator">?:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">return</span> newItem</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// OrderDetail</span></span>
<span class="line">    result<span class="token punctuation">.</span>OrderDetail <span class="token operator">=</span> <span class="token punctuation">(</span>epo0<span class="token punctuation">.</span>OrderDetail <span class="token operator">?:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span>collect <span class="token punctuation">{</span> item <span class="token operator">-&gt;</span></span>
<span class="line">        <span class="token keyword">def</span> newItem <span class="token operator">=</span> <span class="token function">copyMap</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span></span>
<span class="line">        newItem<span class="token punctuation">.</span>contracts <span class="token operator">=</span> null</span>
<span class="line">        newItem<span class="token punctuation">.</span>Product_Id <span class="token operator">=</span> Product_Id</span>
<span class="line">        newItem<span class="token punctuation">.</span>Popid <span class="token operator">=</span> Popid</span>
<span class="line">        <span class="token keyword">return</span> newItem</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">//-------------------------------------------------------</span></span>
<span class="line">    <span class="token comment">// WRITE OUTPUT JSON</span></span>
<span class="line">    <span class="token comment">//-------------------------------------------------------</span></span>
<span class="line">    <span class="token keyword">def</span> outputJson <span class="token operator">=</span> JsonOutput<span class="token punctuation">.</span><span class="token function">prettyPrint</span><span class="token punctuation">(</span>JsonOutput<span class="token punctuation">.</span><span class="token function">toJson</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    flowFile <span class="token operator">=</span> session<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>flowFile<span class="token punctuation">,</span> <span class="token punctuation">{</span> outputStream <span class="token operator">-&gt;</span></span>
<span class="line">        outputStream<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>outputJson<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span>StandardCharsets<span class="token punctuation">.</span>UTF_8<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">as</span> OutputStreamCallback<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    flowFile <span class="token operator">=</span> session<span class="token punctuation">.</span><span class="token function">putAttribute</span><span class="token punctuation">(</span>flowFile<span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;NoWipOrderData&quot;</span></span><span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;false&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    session<span class="token punctuation">.</span><span class="token function">transfer</span><span class="token punctuation">(</span>flowFile<span class="token punctuation">,</span> REL_SUCCESS<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>Exception e<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;Error processing WipOrderData JSON: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">e<span class="token punctuation">.</span>message</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span> e<span class="token punctuation">)</span></span>
<span class="line">    flowFile <span class="token operator">=</span> session<span class="token punctuation">.</span><span class="token function">putAttribute</span><span class="token punctuation">(</span>flowFile<span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;NoWipOrderData&quot;</span></span><span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;true&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    session<span class="token punctuation">.</span><span class="token function">transfer</span><span class="token punctuation">(</span>flowFile<span class="token punctuation">,</span> REL_FAILURE<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-result" tabindex="-1"><a class="header-anchor" href="#_4-result"><span>4. <strong>Result</strong></span></a></h3><p>The Json</p><div class="language-Json line-numbers-mode" data-highlighter="prismjs" data-ext="Json" data-title="Json"><pre><code><span class="line">{</span>
<span class="line">    &quot;DataName&quot;: &quot;PCBcnprod&quot;,</span>
<span class="line">    &quot;Product_Id&quot;: &quot;11117470&quot;,</span>
<span class="line">    &quot;WipOrder&quot;: [</span>
<span class="line">        {</span>
<span class="line">            &quot;WipOrderdata&quot;: {</span>
<span class="line">                &quot;WipOrderid&quot;: &quot;11162&quot;,</span>
<span class="line">                &quot;WorkOrder&quot;: &quot;Order568&quot;,</span>
<span class="line">                &quot;Product_Id&quot;: &quot;11117470&quot;,</span>
<span class="line">                &quot;Popid&quot;:&quot;Order001&quot;,</span>
<span class="line">                &quot;Shipping&quot;: null</span>
<span class="line">            },</span>
<span class="line">            &quot;WipOrderNos&quot;: [</span>
<span class="line">                {</span>
<span class="line">                    &quot;nos&quot;: &quot;E1&quot;,</span>
<span class="line">                    &quot;nosclass&quot;: &quot;E1&quot;,</span>
<span class="line">                    &quot;nosdescription&quot;: &quot;PCB&quot;,</span>
<span class="line">                    &quot;serialno&quot;: &quot;8650979V01&quot;,</span>
<span class="line">                    &quot;Product_Id&quot;: &quot;11117470&quot;,</span>
<span class="line">                    &quot;Popid&quot;:&quot;Order001&quot;,</span>
<span class="line">                }</span>
<span class="line">            ],</span>
<span class="line">            &quot;WipOrderdates&quot;: [</span>
<span class="line">                {</span>
<span class="line">                    &quot;WipOrderdatetype&quot;: &quot;ABC&quot;,</span>
<span class="line">                    &quot;WipOrderdate&quot;: &quot;20251219 00:00:00&quot;,</span>
<span class="line">                    &quot;Product_Id&quot;: &quot;11117470&quot;,</span>
<span class="line">                    &quot;Popid&quot;:&quot;Order001&quot;,</span>
<span class="line">                    &quot;SequenceId&quot;:&quot;11117470ABC&quot;,</span>
<span class="line">                },</span>
<span class="line">                {</span>
<span class="line">                    &quot;WipOrderdatetype&quot;: &quot;EFC&quot;,</span>
<span class="line">                    &quot;WipOrderdate&quot;: &quot;20251212 00:00:00&quot;,</span>
<span class="line">                    &quot;Product_Id&quot;: &quot;11117470&quot;,</span>
<span class="line">                    &quot;Popid&quot;:&quot;Order001&quot;,</span>
<span class="line">                    &quot;SequenceId&quot;:&quot;11117470EFC&quot;,</span>
<span class="line">                }     </span>
<span class="line">            ],</span>
<span class="line">            &quot;weights&quot;: [</span>
<span class="line">                {</span>
<span class="line">                    &quot;tareweight&quot;: &quot;9279001&quot;,</span>
<span class="line">                    &quot;loadweight&quot;: &quot;36721.90&quot;,</span>
<span class="line">                    &quot;Product_Id&quot;: &quot;11117470&quot;,</span>
<span class="line">                    &quot;Popid&quot;:&quot;Order001&quot;,</span>
<span class="line">                }</span>
<span class="line">            ],</span>
<span class="line">            &quot;Orderinfo&quot;: [          </span>
<span class="line">                {</span>
<span class="line">                    &quot;component&quot;: &quot;Order_component_marking_001&quot;,</span>
<span class="line">                    &quot;name&quot;: &quot;Order_marking_axle_gear&quot;,</span>
<span class="line">                    &quot;value&quot;: &quot;R756&quot;,</span>
<span class="line">                    &quot;Product_Id&quot;: &quot;11117470&quot;,</span>
<span class="line">                    &quot;Popid&quot;:&quot;Order001&quot;,</span>
<span class="line">                },</span>
<span class="line">                {</span>
<span class="line">                    &quot;component&quot;: &quot;Order_component_marking_and_retarder&quot;,</span>
<span class="line">                    &quot;name&quot;: &quot;Order_marking_pos_4&quot;,</span>
<span class="line">                    &quot;value&quot;: &quot;C&quot;,</span>
<span class="line">                    &quot;Product_Id&quot;: &quot;11117470&quot;,</span>
<span class="line">                    &quot;Popid&quot;:&quot;Order001&quot;,</span>
<span class="line">                }</span>
<span class="line">            ],</span>
<span class="line">            &quot;orderSpec&quot;: [</span>
<span class="line">                {</span>
<span class="line">                    &quot;varclass&quot;: &quot;FPC&quot;,</span>
<span class="line">                    &quot;varfam&quot;: &quot;1&quot;,</span>
<span class="line">                    &quot;varopt&quot;: &quot;A&quot;,</span>
<span class="line">                    &quot;Product_Id&quot;: &quot;11117470&quot;,</span>
<span class="line">                    &quot;Popid&quot;:&quot;Order001&quot;,</span>
<span class="line">                    &quot;Name&quot;:&quot;111174701A&quot;</span>
<span class="line">                },</span>
<span class="line">                {</span>
<span class="line">                    &quot;varclass&quot;: &quot;FPC&quot;,</span>
<span class="line">                    &quot;varfam&quot;: &quot;9968&quot;,</span>
<span class="line">                    &quot;varopt&quot;: &quot;A&quot;,</span>
<span class="line">                    &quot;Product_Id&quot;: &quot;11117470&quot;,</span>
<span class="line">                    &quot;Popid&quot;:&quot;Order001&quot;,</span>
<span class="line">                    &quot;Name&quot;:&quot;111174709968A&quot;</span>
<span class="line">                }</span>
<span class="line">            ],</span>
<span class="line">            &quot;OrderDetail&quot;: [</span>
<span class="line">                {</span>
<span class="line">                    &quot;OrderId&quot;: &quot;1208922&quot;,</span>
<span class="line">                    &quot;PA&quot;: &quot;T1P11&quot;,</span>
<span class="line">                    &quot;cuobj&quot;: &quot;10088&quot;,</span>
<span class="line">                    &quot;pfipo&quot;: &quot;1208837&quot;,</span>
<span class="line">                    &quot;synctime&quot;: &quot;20251201 00:00:00&quot;,</span>
<span class="line">                    &quot;plstart&quot;: &quot;20251117 17:07:39&quot;,</span>
<span class="line">                    &quot;ppatoo&quot;: &quot;PA&quot;,</span>
<span class="line">                    &quot;ppaobj&quot;: &quot;T1P11&quot;,</span>
<span class="line">                    &quot;plstatus&quot;: &quot;E&quot;,</span>
<span class="line">                    &quot;invest&quot;: null,</span>
<span class="line">                    &quot;assstatus&quot;: &quot;F&quot;,</span>
<span class="line">                    &quot;mtrlstatus&quot;: &quot;S&quot;,</span>
<span class="line">                    &quot;delistatus&quot;: &quot;D&quot;,</span>
<span class="line">                    &quot;remtxt&quot;: null,</span>
<span class="line">                    &quot;frozen&quot;: &quot;N&quot;,</span>
<span class="line">                    &quot;ipocpaobj&quot;: &quot;T1&quot;,</span>
<span class="line">                    &quot;cuseq&quot;: &quot;1&quot;,</span>
<span class="line">                    &quot;ciid_id&quot;: &quot;683268&quot;,</span>
<span class="line">                    &quot;contracts&quot;: null,</span>
<span class="line">                    &quot;Product_Id&quot;: &quot;11117470&quot;,</span>
<span class="line">                    &quot;Popid&quot;:&quot;Order001&quot;,</span>
<span class="line">                },</span>
<span class="line">                {</span>
<span class="line">                    &quot;OrderId&quot;: &quot;1208981&quot;,</span>
<span class="line">                    &quot;PA&quot;: &quot;T1P07A&quot;,</span>
<span class="line">                    &quot;cuobj&quot;: &quot;10107&quot;,</span>
<span class="line">                    &quot;pfipo&quot;: &quot;1208901&quot;,</span>
<span class="line">                    &quot;synctime&quot;: &quot;20251201 00:00:00&quot;,</span>
<span class="line">                    &quot;plstart&quot;: &quot;20251117 17:11:19&quot;,</span>
<span class="line">                    &quot;ppatoo&quot;: &quot;PA&quot;,</span>
<span class="line">                    &quot;ppaobj&quot;: &quot;T1P07A&quot;,</span>
<span class="line">                    &quot;plstatus&quot;: &quot;E&quot;,</span>
<span class="line">                    &quot;invest&quot;: null,</span>
<span class="line">                    &quot;assstatus&quot;: &quot;F&quot;,</span>
<span class="line">                    &quot;mtrlstatus&quot;: &quot;S&quot;,</span>
<span class="line">                    &quot;delistatus&quot;: &quot;D&quot;,</span>
<span class="line">                    &quot;remtxt&quot;: null,</span>
<span class="line">                    &quot;frozen&quot;: &quot;N&quot;,</span>
<span class="line">                    &quot;ipocpaobj&quot;: &quot;T1P07&quot;,</span>
<span class="line">                    &quot;cuseq&quot;: &quot;1&quot;,</span>
<span class="line">                    &quot;ciid_id&quot;: &quot;696375&quot;,</span>
<span class="line">                    &quot;contracts&quot;: null ,</span>
<span class="line">                    &quot;Product_Id&quot;: &quot;11117470&quot;,</span>
<span class="line">                    &quot;Popid&quot;:&quot;Order001&quot;,                </span>
<span class="line">                }</span>
<span class="line">            ]</span>
<span class="line">            </span>
<span class="line">        }</span>
<span class="line">    ]</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-summarize" tabindex="-1"><a class="header-anchor" href="#_5-summarize"><span>5. <strong>Summarize</strong></span></a></h3><div class="language-groovy line-numbers-mode" data-highlighter="prismjs" data-ext="groovy" data-title="groovy"><pre><code><span class="line"><span class="token comment">//-------------------------------------------------------</span></span>
<span class="line"><span class="token comment">//  Safer Deep Copy Helper (Groovy clone() is unreliable)</span></span>
<span class="line"><span class="token comment">//-------------------------------------------------------</span></span>
<span class="line"><span class="token keyword">def</span> copyMap <span class="token operator">=</span> <span class="token punctuation">{</span> m <span class="token operator">-&gt;</span> m <span class="token keyword">instanceof</span> <span class="token class-name">Map</span> <span class="token operator">?</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span> <span class="token operator">+</span> m<span class="token punctuation">)</span> <span class="token punctuation">:</span> m <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">//-------------------------------------------------------</span></span>
<span class="line"><span class="token comment">// Build New JSON Structure</span></span>
<span class="line"><span class="token comment">//-------------------------------------------------------</span></span>
<span class="line"><span class="token keyword">def</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15)])])}const c=s(e,[["render",o]]),u=JSON.parse('{"path":"/blogs/ETL/AppacheNIFI/Groovy/PareseComplexJson.html","title":"Using groovy to parse complex Json","lang":"en-US","frontmatter":{"title":"Using groovy to parse complex Json","date":"2025/11/25","tags":["ApacheNIFI"],"categories":["ETL"]},"headers":[{"level":2,"title":"Using groovy to parse complex Json","slug":"using-groovy-to-parse-complex-json","link":"#using-groovy-to-parse-complex-json","children":[{"level":3,"title":"1. Scenario","slug":"_1-scenario","link":"#_1-scenario","children":[]},{"level":3,"title":"2. Requirement","slug":"_2-requirement","link":"#_2-requirement","children":[]},{"level":3,"title":"3. Solution","slug":"_3-solution","link":"#_3-solution","children":[]},{"level":3,"title":"4. Result","slug":"_4-result","link":"#_4-result","children":[]},{"level":3,"title":"5. Summarize","slug":"_5-summarize","link":"#_5-summarize","children":[]}]}],"git":{"createdTime":1764047965000,"updatedTime":1764047965000,"contributors":[{"name":"jsonzhao","email":"json.zhao.cn@outlook.com","commits":1}]},"filePathRelative":"blogs/ETL/AppacheNIFI/Groovy/PareseComplexJson.md"}');export{c as comp,u as data};
