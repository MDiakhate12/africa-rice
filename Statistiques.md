### Statistiques

| Métrique                                                | graphique             | fonction                                                     |
| ------------------------------------------------------- | --------------------- | ------------------------------------------------------------ |
| **Production**                                          |                       | **Filtres: Localité, Niveau, Date**                          |
| Quantité produite par spéculation                       | Pie Chart / Bar Chart | getProductionSumBySpeculation()                              |
| Quantités produites par variété                         | Pie Chart / Bar Chart | getProductionSumByVariete()                                  |
| **Commande**                                            |                       | **Filtres: Localité, Niveau, Client, Date**                  |
| Evolution commande par mois par spéculation             | Line Chart            | getCommandeSumBySpeculationByMonth()                         |
| Evolution commande par mois par variété                 | Line Chart            | getCommandeSumByVarieteByMonth()                             |
| **Production-Commande**                                 |                       | **Filtres: Localité, Niveau, Client, Date**                  |
| Quantité produite VS Quantité commandée par spéculation | Bar Chart             | getProductionSumBySpeculation() && getCommandeSumBySpeculation() |
| Quantité produite VS Quantité commandée par variété     | Bar Chart             | getProductionSumByVariete() && getCommandeSumByVariete       |
| **Commande-Livraison**                                  |                       | **Filtres: Localité, Niveau, Client, Date**                  |
| Quantité commandée VS Quantité livrée par spéculation   | Bar Chart             | getCommandeSumBySpeculation && getCommandeSumBySpeculation(state=livree) |
| Quantité commandée VS Quantité livrée par variété       | Bar Chart             | getCommandeSumByVariete && getCommandeSumByVariete(state=livree) |

![image-20210408131901293](C:\Users\odiak\AppData\Roaming\Typora\typora-user-images\image-20210408131901293.png)

![image-20210408131949301](C:\Users\odiak\AppData\Roaming\Typora\typora-user-images\image-20210408131949301.png)

![image-20210408132023158](C:\Users\odiak\AppData\Roaming\Typora\typora-user-images\image-20210408132023158.png)

![image-20210408132105923](C:\Users\odiak\AppData\Roaming\Typora\typora-user-images\image-20210408132105923.png)

![image-20210408132139105](C:\Users\odiak\AppData\Roaming\Typora\typora-user-images\image-20210408132139105.png)

![image-20210408132206661](C:\Users\odiak\AppData\Roaming\Typora\typora-user-images\image-20210408132206661.png)