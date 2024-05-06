---
prev:
  text: "Proceed until 'a' is input"
  link: "Read-Until-a"
next: 
  text: "rsync: fast copy"
  link: "/Code/Shell/rsync"
---

# tee introduces subshell

**tee** will consistently introduce a subshell, which can be relatively confusing and troublesome.

Here is a simple example:

## In test.sh

```bash
#!/bin/bash
WORK_DIR=/Users/liuguanfu/balabala
export WORK_DIR
```

## In run-test.sh

```bash
#!/bin/bash
source test.sh 2>&1 | tee test.log
echo "source test.sh 2>&1 | tee test.log"
echo "test.sh has been executed!\n"
echo "WORK_DIR should not been empty.\n"
echo "But it is $WORK_DIR"
```

## source run-test.sh

You will find that WORK_DIR is still empty and it is not defined by test.sh successfully. 

Why?

```bash
source test.sh 2>&1 | tee test.log
```

tesh.sh will be executed in a **subshell** that is introduced by tee. All the combined standard output and standard error inside the subshell will be redirected by tee to a current shell where "source run-test.sh" is executed. 

WORK_DIR is defined inside the subshell, and hence it is un-defined in the current shell. 

## How to deal with tee?

The folloing is a shell script named main.sh

```bash
var="var"
source shell1.sh 2>&1 | tee shell1.log
source shell2.sh 2>&1 | tee shell2.log
source shell2.sh 2>&1 | tee shell3.log
```

If you have to combine the standard output and error and redirect them to both the current shell and the log file named shell1.log, remenber all the variables defined in shell1.sh cannot be accessed by its following shell scripts, shell2.sh, shell3.sh, etc. 

Any variable defined inside shell1.sh can only be accessed in shell1.sh.

Any variables defined in main.sh can be accessed in shell1, shell2.sh, shell3.sh, etc. For example, the variable "var" can be used in shell1.sh, shell2.sh, shell3.sh, etc.

1. If there are some interactive commands (like some input commands) in shell1.sh:
 Please use tee, but do not define any varibles you would like to use in the rest commands in main.sh
2. If there is no any interactive command in shell1.sh:
You can use the following example command and you can defined variables that can be used in shell2.sh, shell3.sh, etc. 

```bash
echo "The standard output and standard error will be redirected to the file shell1.log"
source shell1.sh > shell1.log 2>&1
echo "cat the file shell1.log"
cat shell1.log
```

You can still use tee,

```bash
source shell1.sh 2>&1 | tee shell1.log
```

but do not define variables to be used in the rest shell scripts and just use them inside shell1.sh.
