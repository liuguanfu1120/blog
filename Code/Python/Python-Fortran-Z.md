---
prev: false # TBD
next:  
  text: "Plot secondary axes with Matplotlib"
  link: "/Code/Python/Secondary-Axes"
---

# Pass complex number between Python and Fortran

## Pass complex number from python to Fortran

```python
S1 = np.array([1+2j,2+6j])
S1_f90 = np.array(['({real:0.6f},{imag:0.6f})'.format(real=np.real(a),imag=np.imag(a)) for a in S1])
np.savetxt('test.txt',S1_f90,fmt='%s')
```

## Pass complex number from Fortran to Python


```python
S2_f90 = np.loadtxt('test.txt',dtype=str)


def convert(s):
    s = s.replace('(','')
    s = s.replace(')','j')
    s = s.replace(',','+')
    s = s.replace('+-','-') # in case of negative imaginary part
    return complex(s)


S2_f90 = np.array([convert(a) for a in S2_f90])
```
