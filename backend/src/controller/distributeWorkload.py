import numpy as np
from scipy.optimize import minimize
import math
import sys



daysUntilDeadline = int(sys.argv[2])

minDailyWorkload = 0
maxDailyWorkload = 8
totalWorkload = float(sys.argv[1])
totalWorkAccomplished = 0

arr = np.empty(daysUntilDeadline); arr.fill(0)
output = ""

if totalWorkload==0:
    for index,e in enumerate(arr):
        if(index==0):
            output+=str(e)
        else:
            output+=","
            output+=str(e)
    print(output)
    sys.exit()
    
def objective(x,df=0.95):
    totalUtility = 0
    for index,wt in enumerate(x):
        #print("Day: " + str(index) + ",Workload: " + str(wt))
        if wt == maxDailyWorkload:
            wt=maxDailyWorkload-0.000000000000001
        utility = (math.log(maxDailyWorkload-wt,10)*math.pow(df, index))
        totalUtility += utility
    return (-1*totalUtility)

def constraint1(x):
    totalWorkDone=0
    for e in x:
        totalWorkDone+=e
    return totalWorkload - totalWorkDone

b = (minDailyWorkload,maxDailyWorkload)
bnds = []
i = daysUntilDeadline
while i>0:
    bnds.append(b)
    i = i-1
    
con1 = {'type': 'eq', 'fun': constraint1}
cons = [con1]



sol = minimize(objective,arr,method='SLSQP',bounds=bnds,constraints=cons,options={'maxiter':999999999})

for index,e in enumerate(sol.x):
    if(index==0):
        output+=str(e)
    else:
        output+=","
        output+=str(e)
    
print(output)