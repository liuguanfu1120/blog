---
prev: 
    text: "How to use RMF"
    link: "/Notes/X-ray-Observations/How-to-use-RMF"
next: 
    text: "C-statistics"
    link: "/Notes/X-ray-Observations/C-statistics"
---

# Corrected AIC for X-ray model fitting

Akaike information criterion (AIC) is a popular general classical method for model comparison (see the book: [Ivezić
et al. 2020](https://press.princeton.edu/books/hardcover/9780691198309/statistics-data-mining-and-machine-learning-in-astronomy); or the original paper of Akaike: [Akaike 1974](https://ui.adsabs.harvard.edu/abs/1974ITAC...19..716A)
).

The motivation for using AIC is simple, which is we need some tools to compare different models, i.e., which model is not that good and not substantially supported by the data.

## What is AIC?

The AIC is defined as follows,
$$
    \mathrm{AIC} \equiv -2\ln \left( L^{0}(M) \right) + 2k,
$$
where $L^{0}(M)$ is the maximum value of the likelihood of model $M$, $k$ is the number of parameters of the model $M$.
The second term of $2k$ is a must to make AIC an **unbiased estimator** of **Kullback–Leibler discrepancy**, which quantifies the discrepancy between a selected model and the real mechanism (more details and definitions can be found in [Cavanaugh & Neath 2019](https://wires.onlinelibrary.wiley.com/doi/10.1002/wics.1460))
Additionally, $2k$ can be simply regarded as a **penalty** term for the number of parameters.
Adopting a more complicated model, i.e., the model with larger $k$, will usually result in a smaller $-2\ln \left( L^{0}(M) \right)$ but increase the second term $2k$, and hence there should be a trade-off.
The smaller the AIC, the better the model is, and the model with the smallest AIC is the best model.
Note that it cannot guarantee the best model can describe the real mechanism well and it just performs better than any else adopted model.

## What is corrected AIC?

For small samples, such as $N/k \lesssim 40$, where the $N$ is the number of data points, there should be another penalty term for the number of parameters ([Sugiura
1978](https://www.tandfonline.com/doi/full/10.1080/03610927808827599)), which reads
$$
    \mathrm{AIC}_{c} \equiv -2\ln \left( L^{0}(M) \right) + 2k + \frac{2k(k+1)}{N-k-1}
    = \mathrm{AIC}+\frac{2k(k+1)}{N-k-1}.
$$
The last term is **the second-order effect** that should be taken into consideration when the sample size is small but will be negligible when $N$ is very large.
A model with a number of parameters close to the number of data points will be rejected since the last term will tend to infinity when $k$ approaches $N-1$.
If the last term is committed, the model with a large number may not be rejected for a small sample.
Therefore, $\mathrm{AIC}_{c}$ is **better** than $\mathrm{AIC}$.
Since $N/k\lesssim 40$ is usually satisfied in the context of X-ray model fitting, $\mathrm{AIC}_{c}$ will always be used.

## How to calculate $\mathrm{AIC}_{c}$ when different statistics are adopted?

### $\chi^{2}$ statistics

For statistics based on Gaussian likelihood:
$$
    L(M)=\prod_{i}\frac{1}{\sqrt{2\pi}\sigma_{i}}\exp\left(\frac{-(D_{i}-M_{i})^{2}}{2\sigma_{i}^{2}}\right),
$$
where $L(M)$ is the likelihood for the model $M$, $D_{i}$ is the data in $i$th bin, $M_{i}$ denotes the model prediction in $i$th bin, and $\sigma_{i}$ is the error for the $i$th bin. 
$\chi^{2}$ is defined as follows,
$$
    \chi^{2} \equiv \sum_{i} \frac{(D_{i}-M_{i})^{2}}{\sigma_{i}^{2}},
$$
which obeys the Chi-squared distribution. 
The relation of $\chi^{2}$ and $L(M)$ is straightforward,
$$
    \chi^{2} = -2\ln L(M) + \mathrm{constant}.
$$
Since only the relative value of $\mathrm{AIC}_{c}$ between different models is important, the first term is the minimal value of $\chi^{2}$ for a certain model, namely,

$$
    \mathrm{AIC}_{c}=\chi^{2}_{\mathrm{min}} + 2k + \frac{2k(k+1)}{N-k-1} \qquad \mathrm{for } ~\chi^{2} ~\mathrm{statistics.}
$$

### C-statistics

For statistics based on Poisson likelihood:
$$
    L(M)=\prod_i \frac{M_i^{D_i}}{D_{i} !} \exp \left(-M_i\right)
$$
Taking its logarithm and multiplying by $-2$, we can get
$$
    -2\ln L(M) = 2\sum_{i} (M_{i}-D_{i}\ln M_{i}+\ln(D_{i}!)).
$$
Omitting the factorial term, we can get the Cash-statistics ([Cash 1979](https://ui.adsabs.harvard.edu/abs/1979ApJ...228..939C)):
$$
    \tilde{C} = 2\sum_{i} (M_{i}-D_{i}\ln M_{i}).
$$
Approximating the factorial term by [Stirling's formula](https://en.wikipedia.org/wiki/Stirling%27s_approximation), that is
$$
    \ln(D_{i}!) \approx D_{i}\ln D_{i} - D_{i},
$$
a modification of the original Cash-statistic, C-statistics, can be obtained as follows:
$$
    C = 2\sum_{i}(M_{i}-D_{i}\ln M_{i}+D_{i}\ln D_{i} - D_{i}),
$$
which is implemented in some popular fitting packages like XSPEC ([Arnaud 1996](https://ui.adsabs.harvard.edu/abs/1996ASPC..101...17A)), SHERPA ([Freeman et al.
2001](https://ui.adsabs.harvard.edu/abs/2001SPIE.4477...76F)), and SPEX ([Kaastra et al. 1996](https://ui.adsabs.harvard.edu/abs/1996uxsa.conf..411K)).
$\tilde{C}$ is the same as $C$, up to a constant $\sum_{i}(D_{i}\ln D_{i} - D_{i})$.
$C$ is non-negative, $C$ is equal to $0$ if and only if all the $M_{i}$ are equal to $D_{i}$.
Since the count rate is usually low for X-ray observation, it is better to use C-statistics fitting than $\chi^{2}$ fitting, i.e., getting the best-fit parameters by minimizing $C$ instead of $\chi^{2}$.
The corresponding $\mathrm{AIC}_{c}$ is
$$
    \mathrm{AIC}_{c}=C_{\mathrm{min}} + 2k + \frac{2k(k+1)}{N-k-1} \qquad \mathrm{for } ~\mathrm{C-statistics.}
$$
As for the calculation of $\mathrm{AIC}_{c}$, the first term should be $\chi^{2}_{\mathrm{min}}$ if $\chi^{2}$ fitting is used, while it should be $C_{\mathrm{min}}$ if C-statistics fitting is implemented ([Peca et al. 2023](https://iopscience.iop.org/article/10.3847/1538-4357/acac28); [Ng et al. 2022](https://iopscience.iop.org/article/10.3847/1538-4357/ac9965); [Rogantini et al. 2019](https://www.aanda.org/10.1051/0004-6361/201935883); [Igoshev et al. 2018](https://iopscience.iop.org/article/10.3847/1538-4357/aadd93)).

For a given model, its $\Delta \mathrm{AIC}_{c}$ is defined as the relative difference of  $\mathrm{AIC}_{c}$ between the minimum $\mathrm{AIC}_{c}$, which reads,
$$
    \Delta \mathrm{AIC}_{c} \equiv \mathrm{AIC}_{c}-\mathrm{AIC}_{c,\mathrm{min}}.
$$
The model with the minimum $\mathrm{AIC}_{c}$ is the most preferred model, but the rest models can be simply ruled out.
Generally, the model with $\Delta \mathrm{AIC}_{c}>2$ is not substantially supported by the observation data and may not be reserved ([Burnham et al. 2002](https://link.springer.com/book/10.1007/b97636)).
The following table ([Burnham et al. 2002](https://link.springer.com/book/10.1007/b97636)) 
shows the level of empirical support for different $\Delta \mathrm{AIC}_{c}$.

The model whose $\Delta \mathrm{AIC}_{c}$ within 2 is substantially supported by the data, 
i.e., the model with $\Delta \mathrm{AIC}_{c}$ within 2 is not significantly different from the best model and **cannot** be ruled out.
However, the model whose $\Delta \mathrm{AIC}_{c}$ is larger than 2 is considerably less supported by the data, 
i.e., the model with $\Delta \mathrm{AIC}_{c}$ larger than 2 is **probably** not the best model and **can** be ruled out.
The model whose $\Delta \mathrm{AIC}_{c}$ is larger than 10 is essentially not supported by the data, 
you **should** discard such a model.

| $\Delta \mathrm{AIC}_{c}$ | Level of Empirical Support |
|---------------------------|----------------------------|
| 0-2                       | Substantial                |
| 4-7                       | Considerably less          |
|     >10                   | Essentially none           |

## Attention

The corrected AIC can be used if you **cannot** rule out some models from the perspective of physics.
Namely, corrected AIC just rules out the models from the perspective of statistics.
If you can rule out some models from the perspective of physics, please rule out them first.