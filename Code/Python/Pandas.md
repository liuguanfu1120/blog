---
prev:
    text: 'More tips about Matplotlib'
    link: '/Code/Python/Matplotlib'
next: 
    text: 'Numpy tips'
    link: '/Code/Python/Numpy'
---

# Pandas tips

## Read data

```python
import pandas as pd
yield_file = 'Nomoto2013.dat'
colspecs = [ ]
# A list of tuples giving the extents of the fixed-width fields of each line as half-open intervals (i.e., [from, to[ ).
# For Nomoto et al. (2013), the colspecs is as follows:
# 14, 13, 13, 13, ......, 13, 11+1('\n'),
for i in range(31):
    if i == 0:
        colspecs.append((0, 14))
    else:
        colspecs.append((14+13*(i-1), 14+13*i))

df = pd.read_fwf(yield_file, colspecs=colspecs, skiprows=1, nrows=172)
```

There are many methods to read files, such as `read_csv`, `read_table`, `read_fwf`, etc. The `read_fwf` is used here because the data is in fixed-width format (fwf).
For fixed-width format file, the `colspecs` is needed to be specified.
The `skiprows` is used to skip the header, and `nrows` is used to specify the number of rows to read.
The file `Nomoto2013.dat` can be downloaded at [Yield Table (2013)](http://star.herts.ac.uk/~chiaki/works/YIELD_CK13.DAT).

Reading a fixed-width format file sometimes can be tricky or not as straightforward as a CSV file, and hence an example is given here.

## Add data

The data can be downloade at [Solar Abundance Sets in SPEX](https://github.com/liuguanfu1120/blog/blob/main/Code/Python/Python-data/spex-abundance.csv), which comes from [Abundance: standard abundances](https://spex-xray.github.io/spex-help/reference/commands/abundance.html).

```python


```

## Delete data



## Search data


## Modify data


