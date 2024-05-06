---
prev: false

next:
  text: "Caveates on tee"
  link: "/Code/Shell/tee"
---
# How to let a shell script do not proceed until "a" is input

```bash
#!/bin/bash
# Initialize the variable a
a=""
# Use a while loop to read input until a is set
while [ -z "$a" ]; do
    echo "Enter a value for 'a'."
    read a
done

# Print the value of a
echo "You entered: $a"
```

**DO NOT** use "read -p"!

- In bash:
    "-p" means add a prompt
- In zsh:
    "-p" means input from a coprocess

If you in a terminal uses zsh and source a shell script containing "read -p":

```zsh
read:2: -p: no coprocess
```

In summary, just use "echo" before read a variable from the input.