# Write a program that prompts the user to input an integer and then outputs the number with the digits
# reversed. For example, if the input is 12345, the output should be 54321.

def reverse(n):
   
    num_str = str(n)
    reversed_str = num_str[::-1]
    reversed_num = int(reversed_str)
    return reversed_num

# Write a program that reads a set of integers, and then prints the sum of the even and odd integers.
def even_odd():
    num_set = set(map(int, input("Enter a set of integers separated by spaces: ").split()))
    even_sum = sum(num for num in num_set if num % 2 == 0)
    odd_sum = sum(num for num in num_set if num % 2 != 0)
    print("Sum of even numbers:", even_sum)
    print("Sum of odd numbers:", odd_sum)

#Fibonacci series is that when you add the previous two numbers the next number is formed. You have
# to start from 0 and 1.   

def fibonacci(n):
    fib_series = [0, 1]
    while len(fib_series) < n:
        fib_series.append(fib_series[-1] + fib_series[-2])
    return fib_series

# Write a Python code to accept marks of a student from 1-100 and display the grade according to the
# following formula.
# Grade F if marks are less than 50
# Grade E if marks are between 50 to 60
# Grade D if marks are between 61 to 70
# Grade C if marks are between 71 to 80
# Grade B if marks are between 81 to 90
# Grade A if marks are between 91 to 100



# Write a program that takes a number from user and calculate the factorial of that number.    

def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)
    

def determine_grade(marks):
    if marks < 0 or marks > 100:
        return "Invalid marks. Please enter a value between 1 and 100."
    elif marks < 50:
        return "Grade F"
    elif 50 <= marks <= 60:
        return "Grade E"
    elif 61 <= marks <= 70:
        return "Grade D"
    elif 71 <= marks <= 80:
        return "Grade C"
    elif 81 <= marks <= 90:
        return "Grade B"
    elif 91 <= marks <= 100:
        return "Grade A"

