---
layout: hero
title: Experiments
permalink: /blog/
---

<div class="container" style="width: 50%">
<section class="row main-section">
<ul class="post-list">
  {% for post in site.posts limit:10 %}
          <li class="post-entry">
            
            <h3>
              <a class="post-link" href="{{ post.url }}">
                <b>{{ post.title }}</b>
              </a>
            </h3>
            
            <div class="post-meta">
            <a href="{{post.author_url}}">{{post.author}}</a>, 
             <time class="dt-published" datetime="{{post.date}}" itemprop="datePublished">
            Jul 27, 2018
            </time> 
            </div>

            <p>{{ post.abstract | strip_html}}</p>
             <a href="{{ post.url }}"> Read More...</a>
          </li>
  {% endfor %}
</ul>
</section>
</div>