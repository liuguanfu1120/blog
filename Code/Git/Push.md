---
prev: false # TBD
next: false # TBD
---
# A simple example

```bash
git init
git add .
git commit -m "first commit"
git branch -m master main
git remote add origin [<repository_URL>]
# such as:
# git remote add origin https://github.com/liuguanfu1120/blog
git push -u origin main
```

# Some notes

Your local branch will be named by "master" by default. If you

```bash
git push -u origin master
```

it will be pushed to the remote branch also named "master" (the same name).

There are two ways if you want to push to a remote branch with a different name, say, "main":

- 1. Rename your local branch to the same name as the remote branch, like this:

```bash
git branch -m master main
```

Then you can push to the remote branch named "main":

```bash
git push -u origin main
```

- 2. Push to the remote branch named "main" directly:

```bash
git push -u origin master:main
```

I recommend the first way, because it is more convenient.
