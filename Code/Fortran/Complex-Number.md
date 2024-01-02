---
prev: false # TBD
next: false # TBD
---

# 基本用法

## 取实部

用**DBLE**函数，不需要指定kind

## 取虚部

用**AIMAG**函数，不需要指定kind

## 赋值

### cmplx

```fortran
RESULT = CMPLX(X [, Y [, KIND]])
```

要指定kind，如果没有使用kind这个参数，即使X和Y的精度是双精度，最后也会变成**单精度**。

### complex

 ```fortran
RESULT = COMPLEX(X, Y)
```

不需要指定kind

### 在array constructor中

```fortran
COMPLEX(KIND=DPC),DIMENSION(3)::c1
c1=[cmplx(1.0_dp,2.0_dp,kind=dpc), cmplx(1.0_dp,2.0_dp,kind=dpc), cmplx(1.0_dp,2.0_dp, kind=dpc)]
```

使用双精度得指定kind。

```fortran
COMPLEX(KIND=DPC),DIMENSION(3)::c1
c1=[complex(1.0_dp,2.0_dp), complex(1.0_dp,2.0_dp), complex(1.0_dp,2.0_dp)]
```

上面的这种情况会报错，因为**complex**本身还可以是array constructor里面申明类型的语句，所以应该这样写：

```fortran
COMPLEX(KIND=DPC),DIMENSION(3)::c1
c1=[complex(kind=dpc)::complex(1.0_dp,2.0_dp), complex(1.0_dp,2.0_dp), complex(1.0_dp,2.0_dp)]
```
