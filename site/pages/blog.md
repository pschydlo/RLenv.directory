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

            {% assign day = post.date | date: "%-d"  %}
            {% case day %}
              {% when '1' or '21' or '31' %}{{ day }}st
              {% when '2' or '22' %}{{ day }}nd
              {% when '3' or '23' %}{{ day }}rd
              {% else %}{{ day }}th
            {% endcase %}
            {{ post.date | date: "of %B, %Y" }}
            
            </time> 
            </div>

            <p>{{ post.abstract | strip_html}}</p>
             <a href="{{ post.url }}"> Read More...</a>
          </li>
  {% endfor %}
</ul>
</section>
</div>