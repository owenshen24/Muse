import os
import json
import time
import PyRSS2Gen
from datetime import datetime
from jinja2 import Environment, PackageLoader
from markdown2 import markdown

# Base URL
URL = "https://owenshen24.github.io/muse/"

# JSON of all blog posts
POSTS = {}

# Go through all posts and populate POSTS.
for md_post in os.listdir('content'):
    file_path = os.path.join('content', md_post)

    # Grab the date last modified.
    time = int(os.path.getmtime(file_path))
    last_modified_time = datetime.fromtimestamp(
    time).strftime('%Y-%m-%d %H:%M')

    # Open and parse the file.
    with open(file_path, 'r') as file:
        parsed_file = markdown(file.read(), extras=['metadata'])
        title = parsed_file.metadata['title']
        anchor = title.replace(' ', '-')
        tags = []
        if ('tags' in parsed_file.metadata.keys()):
            tags = parsed_file.metadata['tags'].replace(' ', '').split(',')
        data = {
            'content': parsed_file,
            'title': title,
            'date': last_modified_time,
            'timestamp': time,
            'anchor': anchor,
            'tags': tags
        }
        # Add the post to the POSTS dictionary
        POSTS[anchor] = data
        file.close()

    # Rename the file to be the anchor
    os.rename(file_path, os.path.join('content',(anchor + '.md')))

# Order posts from newest to oldest
POSTS = {
    post : POSTS[post] for post in sorted(POSTS,
        key=lambda post: POSTS[post]['timestamp'],
        reverse=True)
}

# Create XML file for RSS readers
rss_items = []
for p in POSTS:
    rss_items.append(
    	PyRSS2Gen.RSSItem(
    	  title = POSTS[p]['title'],
          link = URL + "#" + POSTS[p]["anchor"]
          )
  )
rss = PyRSS2Gen.RSS2(
  title = "Muse",
  link = URL,
  description = "Owen's short-form blog",
  lastBuildDate = datetime.now(),
  items = rss_items
  )
rss.write_xml(open("muse.xml", "w"))


# Render post in Jinja2
env = Environment(loader=PackageLoader('volta', 'templates'))
index_template = env.get_template('index-template.html')
index_html_content = index_template.render(posts =
    [POSTS[post] for post in POSTS])

# Write POSTS to index.html
with open('index.html', 'w') as file:
    file.write(index_html_content)

# Remove content from posts to reduce JSON size:
for p in POSTS:
    POSTS[p].pop('content')

# Write POSTS to POSTS.json
with open('POSTS.json', 'w') as file:
    json.dump(POSTS, file)
