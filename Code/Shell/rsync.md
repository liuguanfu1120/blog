---
prev:
  text: "Caveats on tee"
  link: "/Code/Shell/tee"
next: false
---
# Copy specified files 

## A simple example

```bash
rsync -av  --include={file1,file2} --exclude="*" source_directory destination_directory
```

1. It is not "includes" and it cannot be "{file1,file2}". Double quotation mark means patterns in rsync, and hence it should be exclude="\*" and exclude=\* does not work.
2. You must use exclude="\*", include first, and exclude second. It will copy all the files under the source director, not only the specified file1 and file2, if you leave out exclude"\*".

## The names of files in a text file

If the filenames, such as file1, file2, etc., is stored in a text file like "filenames.text":

```text
file1
file2
file3
file4
```
Note that it must be **one filename in one single line**. If you filename.txt reads:

```text
file1 file2 file3 file4
```

Filenames are separated by spaces. 
You must modify it to make it one line for one filename. You can use **tr** command:

```bash
tr -s ' ' '\n' < filenames.txt > filenames1.txt
mv filenames1.txt filenames.txt
```

"-s" means "squeeze" and it will replace multiple spaces by one single break line symbol. 
Similarly, if your filenames file is separated by tab:

```bash
tr -s '\t' '\n' < filenames.txt > filenames1.txt
mv filenames1.txt filenames.txt
```

Finally, use rsync like the following example:

```bash
rsync -av --files-from=filenames.txt source_directory destination_directory
```

