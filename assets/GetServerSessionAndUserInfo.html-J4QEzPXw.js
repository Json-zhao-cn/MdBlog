import{_ as e,c as n,b as i,o as a}from"./app-BBGgfQOx.js";const l={};function r(t,s){return a(),n("div",null,[...s[0]||(s[0]=[i(`<h2 id="using-sql-to-get-db-server-user-and-session-info" tabindex="-1"><a class="header-anchor" href="#using-sql-to-get-db-server-user-and-session-info"><span><strong>Using SQL to get DB server user and session info</strong></span></a></h2><p>Get Current DB connection user and session</p><div class="language-SQL line-numbers-mode" data-highlighter="prismjs" data-ext="SQL" data-title="SQL"><pre><code><span class="line">-- Get Current DB connection user and session</span>
<span class="line">SELECT </span>
<span class="line">    session_id AS [Session ID],</span>
<span class="line">    login_name AS [Login Name],</span>
<span class="line">    host_name AS [Host Name],</span>
<span class="line">    program_name AS [Program Name],</span>
<span class="line">    status AS [Status],</span>
<span class="line">    cpu_time AS [CPU Time],</span>
<span class="line">    memory_usage AS [Memory Usage],</span>
<span class="line">    reads AS [Reads],</span>
<span class="line">    writes AS [Writes],</span>
<span class="line">    logical_reads AS [Logical Reads],</span>
<span class="line">    last_request_start_time AS [Last Request Start],</span>
<span class="line">    last_request_end_time AS [Last Request End]</span>
<span class="line">FROM sys.dm_exec_sessions</span>
<span class="line">WHERE is_user_process = 1  --Only display user processes and exclude system processes</span>
<span class="line">--and login_name=&#39;YourUser&#39; </span>
<span class="line">ORDER BY session_id;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)])])}const o=e(l,[["render",r]]),c=JSON.parse('{"path":"/blogs/Skills/SQLServer/UserAndSession/GetServerSessionAndUserInfo.html","title":"Using SQL to get DB server user and session info","lang":"en-US","frontmatter":{"title":"Using SQL to get DB server user and session info","date":"2025/11/26","tags":["SQLServer"],"categories":["Skills"]},"headers":[{"level":2,"title":"Using SQL to get DB server user and session info","slug":"using-sql-to-get-db-server-user-and-session-info","link":"#using-sql-to-get-db-server-user-and-session-info","children":[]}],"git":{"createdTime":1764135587000,"updatedTime":1764135587000,"contributors":[{"name":"jsonzhao","email":"json.zhao.cn@outlook.com","commits":1}]},"filePathRelative":"blogs/Skills/SQLServer/UserAndSession/GetServerSessionAndUserInfo.md"}');export{o as comp,c as data};
