---
prev: 
    text: "C-statistics"
    link: "/Notes/X-ray-Observations/C-statistics"
next: false
---

# Why use log-normal distribution?

## 1. SPEX uses log-normal distribution to model the emission measure distribution

The emission measure distribution is often modeled by a log-normal distribution in SPEX. The emission measure distribution is defined as
$$
Y(x)=\frac{Y_0}{\sqrt{2 \pi} \sigma_T} e^{-(x-x 0)^2 / 2 \sigma_T^2}
$$

where $Y_0$ is the total, integrated emission measure. By default $x\equiv \log T$ and $x_0\equiv \log T_0
$ with $T_0$ the average temperature of the plasma (from [Cie](https://spex-xray.github.io/spex-help/models/cie.html)).

Such a log-normal distribution may be confusing for a beginner.

## 2. The log-normal distribution originates from multiplicative processes

### 2.1 What is a multiplicative process?

The density, pressure, temperature, and other physical properties of the plasma are often influenced by various multiplicative processes, such as shock heating, radiative cooling, and turbulent mixing.
After a certain physical process, such as shock heating, the temperature of the plasma will be multiplied by a factor, which is a random variable, that is
$$
T_{\rm post}=T_{\rm pre}\times r,
$$
where $r$ is a random variable, $T_{\rm pre}$ and $T_{\rm post}$ are the temperature before and after the physical process, respectively.
The post-process temperature is related to the pre-process temperature by a multiplicative factor $r$, which is why we refer to it as a multiplicative process.

### 2.2 How does the log-normal distribution arise from multiplicative processes?

For a large number of such processes, the temperature of the plasma will be a product of a large number of random variables.
The final temperature of the plasma is related to the initial temperature by
$$
T_{\rm final}=T_{\rm initial}\times r_1\times r_2\times r_3\times \cdots \times r_n,
$$
where $r_1$, $r_2$, $r_3$, $\cdots$, $r_n$ are random variables that are independently and identically distributed (regardless of the shape of the distribution), and $n$ is the number of multiplicative processes.
$n$ is sufficiently large, and the central limit theorem can be applied, the distribution of the final temperature will be approximately log-normal.
Some essential derivations are shown in the following.
$$
\log \frac{T_{\rm final}}{T_{\rm initial}}=\log r_1+\log r_2+\log r_3+\cdots+\log r_n
$$
Since $\log r_{j}$ ($j=1,2,3,\cdots,n$) are independent and identically distributed, the central limit theorem can be applied, and the distribution of $\log \frac{T_{\rm final}}{T_{\rm initial}}$ will be approximately normal, that is 
$$
\log \frac{T_{\rm final}}{T_{\rm initial}}\sim N(n\mu,n\sigma^2).
$$
Here, we suppose that the mean value and variance of $\log r_{j}$ ($j=1,2,3,\cdots,n$) are $\mu$ and $\sigma^2$, respectively.
Let $x\equiv \log T_{\rm final}$ and $x_0\equiv \log T_{\rm initial}$, then
$$
x-x_0\sim N(n\mu,n\sigma^2),
$$
namely, the distribution of $x-x_0$ will be
$$
f(x-x_0)=\frac{1}{\sqrt{2\pi n\sigma^2}}\exp\left(-\frac{(x-x_0-n\mu)^2}{2n\sigma^2}\right).
$$
We can clearly see that $\log T_{0} = x_{0}+n\mu$.

### 2.3 Addictive or multiplicative processes?

Likewise, the additive process will lead to a normal distribution, and it is defined as follows.
$$
T_{\rm post}=T_{\rm pre}+ \Delta T,
$$
where $\Delta T$ is a random variable.
The post-process temperature of the plasma is related to the pre-process temperature by an additive factor $\Delta T$, which is why we refer to it as an additive process.
Certain shot-noise models could be the additive process. For more details about addictive and multiplicative processes, you can see [Uttley et al. (2005)](https://ui.adsabs.harvard.edu/abs/2005MNRAS.359..345U/abstract).

## 3. Some first-sight properties of the log-normal distribution

If you find it hard to understand the origin of the log-normal distribution, i.e., you cannot understand the derivation of the log-normal distribution from multiplicative processes, you can also gain some primary insight into the log-normal distribution from its properties.

- (1) The log-normal distribution is more suitable for the physical properties that **cannot be negative**, such as the temperature, density, and pressure of the plasma.
Although you can also use the normal distribution to model the temperature, density, and pressure of the plasma, you must **truncate** the normal distribution to ensure that the temperature, density, and pressure are non-negative.
- (2) The log-normal distribution is more suitable for the physical properties that range over **several orders of magnitude**.
If you insist on using the normal distribution that centers at $10^{5.5}~\mathrm{K}$ (whatever the number is) to model the temperature, the contribution from the much lower (like $10^{4}~\mathrm{K}$) or higher temperature (like $10^{6}~\mathrm{K}$) will be insignificant unless you use a large $\sigma$.