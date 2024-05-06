---
prev: 
    text: "Pandas tips"
    link: "/Code/Python/Pandas"
next: false
---

## 1. Creat arrays
There are many ways to create arrays in numpy.
- From a list
- From a file
- From a function like np.arange, np.linspace, np.logspace, etc.
- Using **list comprehension**
- **Vectorizing** a user-defined function

A simple example for a list comprehension:
```python
import numpy as np

a = np.array([i for i in range(10)])
print(a)
```
You can even use a condition in the list comprehension:
```python
import numpy as np

a = np.array([i for i in range(10) if i % 2 == 0])
print(a)
```
It is faster than using a for loop to create the array.

A simple example of vectorizing a user-defined function:
```python
import numpy as np  

def myfunc(a, b):
    if a > b:
        return a - b
    else:
        return a + b

vfunc = np.vectorize(myfunc)

a = np.array([1, 2, 3, 4, 5])
b = np.array([5, 4, 3, 2, 1])

c = vfunc(a, b)
print(c)
```
The vectorized function is applied to each element of the input arrays, and the result is a new array.

## 2. Views and Copies
- Views: A new way to access the data. Modifying a view modifies the original array.
- Copies: A new copy of the data. Modifying a copy does not modify the original array.

Be careful with views and copies. They can lead to unexpected results.
How to check if an array is a view or a copy? `np.may_share_memory(a, b)` returns `True` if the arrays share memory block (view).

```python
x = np.random.uniform(-1, 1, 10)
print("x[:5] is a view of x, do they share the same memory?")
print(np.may_share_memory(x, x[:5]))
y1 = x
print("x and y1 are the same array, do they share the same memory?")
print(np.may_share_memory(x, y1))
y2 = x.copy()
print("y2 is a copy of x, do they share the same memory?")
print(np.may_share_memory(x, y2))
```

Output:
```python
x[:5] is a view of x, do they share the same memory?
True
x and y1 are the same array, do they share the same memory?
True
y2 is a copy of x, do they share the same memory?
False
```

## 3. Slicing and indexing

- Slicing: Accessing a part of an array. `a[start:stop:step]`, where a is a numpy array.
- Indexing: Accessing a single element of an array.

some useful tips about slicing and indexing:
- Inverse the order of an array: `a[::-1]`
- Accessing every second element: `a[::2]`
- Boolean indexing: `a[a > 5]`
- Deal with NaN: `np.isnan(a)`
- Get the index of the maximum value: `np.argmax(a)` or `a.argmax()`
- Return the indices that would sort an array: `np.argsort(a)` or `a.argsort()`
  
Boolean indexing is even more frequently used than other tips. Because we usually need to filter the data based on some conditions.
```python
x = np.arange(10)
print("x is", x)
print("Inverse the order of x is", x[::-1])
print("Add a new axis to x is", x[None])

x = np.array([3, 5, 4, 6, 8, 2, 1, 7])
print("x is", x)
print("The index of the minimum value of x is", x.argmin())
print("The index of the maximum value of x is", x.argmax())
print("The index of the sorted x is", x.argsort())
```

Output:
```python
x is [0 1 2 3 4 5 6 7 8 9]
Inverse the order of x is [9 8 7 6 5 4 3 2 1 0]
Add a new axis to x is [[0 1 2 3 4 5 6 7 8 9]]
x is [3 5 4 6 8 2 1 7]
The index of the minimum value of x is 6
The index of the maximum value of x is 4
The index of the sorted x is [6 5 0 2 1 3 7 4]
```

```python
# I would like to provide more examples of boolean indexing,
# since it is important and useful in data analysis.

x = np.arange(-10, 10+1, 1)
print(x)
mask1 = x<0
print(mask1)
mask2 = x>5
print(mask2)
print("How many numbers that are negative in x?", (x<0).sum())
print("The elements within [0, 5] are", x[(x>=0) & (x<=5)])
x[(~mask1) & (~mask2)] = 0
print("The elements within [0, 5] in x are set to 0:", x)
```

Output:
```python
[-10  -9  -8  -7  -6  -5  -4  -3  -2  -1   0   1   2   3   4   5   6   7
   8   9  10]
[ True  True  True  True  True  True  True  True  True  True False False
 False False False False False False False False False]
[False False False False False False False False False False False False
 False False False False  True  True  True  True  True]
How many numbers that are negative in x? 10
The elements within [0, 5] are [0 1 2 3 4 5]
The elements within [0, 5] in x are set to 0: [-10  -9  -8  -7  -6  -5  -4  -3  -2  -1   0   0   0   0   0   0   6   7
   8   9  10]
```

```python
# You can also use np.where to do the same thing.
x = np.arange(-10, 10+1, 1)
print(x)
mask1 = x>=0
mask2 = x<=5
x = np.where(mask1 & mask2, 0, x)
print(x)

# a.argmax() returns the index of the first occurrence of the maximum value.
# If you want to get all the indices of the maximum value, you can use np.where.
a = np.array([1, 2, 3, 4, 5, 5, 5])
print(a.argmax())
print("All the indices of the maximum value in the array:", np.where(a==a.max()))
```

Output:
```python
[-10  -9  -8  -7  -6  -5  -4  -3  -2  -1   0   1   2   3   4   5   6   7
   8   9  10]
[-10  -9  -8  -7  -6  -5  -4  -3  -2  -1   0   0   0   0   0   0   6   7
   8   9  10]
4
All the indices of the maximum value in the array: (array([4, 5, 6]),)
```

## 4. Structured arrays

I suggest that you may as well use structured arrays often.
The point is that it is common to read some data from txt or csv files, and each column of the data file stands for a physical parameter. In this case, structured arrays are very useful, since they can give each column a name and a data type.

```python
energy_ev = np.linspace(1000, 3000, 50)
wave_length_nm = 1239.84193/energy_ev
tmp = np.column_stack((energy_ev, wave_length_nm))
np.savetxt("energy_wave_length.txt", tmp)
arr1 = np.loadtxt("energy_wave_length.txt", dtype=[('energy', 'f8'), ('wave_length', 'f8')])
# You can access the energy and wave_length by arr1['energy'] and arr1['wave_length'].
arr2 = np.loadtxt("energy_wave_length.txt")
# You can access the energy and wave_length by arr2[:, 0] and arr2[:, 1].
# However, the second method is not as clear as the first one.
```

## 5. Operation along an axis

Supposing `a` is a numpy array whose shape is (m, n), `a.sum(axis=0)` returns an array whose shape is (n,). It is the sum of each column of `a`. `a.sum(axis=1)` returns an array whose shape is (m,). It is the sum of each row of `a`.

You may conclude that `axis=0` means the operation is along the column, and `axis=1` means the operation is along the row.
However, the column is the second axis, and the row is the first axis. It is a little confusing.
Moreover, if you are dealing with an array whose dimension is higher than 2, it is more confusing.

Just forget "`axis=0` means the operation is along the column, and `axis=1` means the operation is along the row", just remember: `axis=i`` means the operation is along the `i-th` axis, namely, keeping the rest axes unchanged.
For example, supposing a is an array whose shape is (3, 4, 5), `a.sum(axis=2)` means do the summation of each 5 elements along the third axis, and the result is an array whose shape is (3, 4).

```python
a = np.arange(0, 60, 1).reshape(3, 4, 5)
print("The original array is:\n", a)
print("Sum along the 2th axis:\n", a.sum(axis=2))
```

Output:
```python
The original array is:
 [[[ 0  1  2  3  4]
  [ 5  6  7  8  9]
  [10 11 12 13 14]
  [15 16 17 18 19]]

 [[20 21 22 23 24]
  [25 26 27 28 29]
  [30 31 32 33 34]
  [35 36 37 38 39]]

 [[40 41 42 43 44]
  [45 46 47 48 49]
  [50 51 52 53 54]
  [55 56 57 58 59]]]
Sum along the 2th axis:
 [[ 10  35  60  85]
 [110 135 160 185]
 [210 235 260 285]]
```


