---
layout: default
title: About
permalink: /about/
---

<div class="center">
<div style="width: 40%;">
<div style="text-align: center;">
  <img src="https://rlenv.directory/assets/images/logo.png" alt="Logo" width="256px" >
  <br>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PR">
  <br>
  <br>
<p>

Datasets are a major force in the machine learning strategy. Processing capacity, algorithms and data define the evolution of the field.
</p>

<p>

Learning environments are the datasets of reinforcement learning, they can be seen as simulations of real life processes, simple or complex. A key piece for progress in the field of reinforcement learning are new learning environments. 

</p>

<p style="font-weight: bold;">
Our mission is to encourage the creation of new and more complex learning environments by making their discovery easy.

</p>

<p >
  RLenv.directory allows you to explore 100+ open source environments and find exotic reinforcement learning environments right from the comfort of your browser. 
</p>

<h3>
Contributions with <i class="fas fa-heart"></i> by:
</h3>

<div class="github-icons">
{% for user in site.github.contributors %}
{% if user.login == 'pschydlo' %}
  {% continue %}
{% endif %}
<a href="{{user.html_url}}"><img class="github-icon" src="{{user.avatar_url}}" width="80px"></a>
{% endfor %}


<h3>
Maintained by:
</h3>
<div class="github-icons">
<a href="{{site.github.owner_url}}"><img class="github-icon" src="{{site.github.owner_gravatar_url}}" width="80px"></a>
</div>

</div>
</div>