#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>

struct num{
    int value;
    int prime_check;
    struct num * next;
};

struct num * first;
struct num * current;

int mod (int, int);
int gcd (int, int);
void prime(int, int*);
void display(int);

int main()
{
    // Create base address
    first = (struct num *) malloc(1*sizeof(struct num));
    if(first == NULL){
        printf("Some kind of malloc() error\n");
        exit(1);
    }
    current = first;

    // Read input
    int length = 0;
    printf("Enter an array of integer: ");
    do{
        scanf("%d", &current->value);
        length++;
        current->next = (struct num *) malloc(1*sizeof(struct num));
        if(current->next == NULL){
            printf("Another malloc() error\n");
            exit(1);
        }
        current = current->next;
    } while(getchar() != '\n');
    current->next = NULL;

    // Check for prime number
    int prime_count;
    prime(length, &prime_count);

    // Display result
    display(prime_count);

    return 0;
}

int mod(int dividend, int divisor)
{
    int r = dividend % divisor;
    if(r < 0)
        r = r + divisor;
    return r;
}

int gcd(int first_num, int second_num)
{
    int a, b, x;

    if(first_num < second_num){
        a = second_num;
        b = first_num;
    }
    else{
        a = first_num;
        b = second_num;
    }

    while(b != 0){
        x = mod(a, b);
        a = b;
        b = x;
    }

    return a;
}

void prime(int length, int * prime_count)
{
    current = first;
    while(current->next){
        current->prime_check = 1;
        if(current->value >= 2){
            for(int i = 2; i <= current->value; i++){
                if(gcd(current->value,i) != 1 && i != current->value){
                    printf("%d is divisible by %d\n", current->value, i);
                    current->prime_check = 0;
                    length--;
                    break;
                }
            }
        }
        else{
            current->prime_check = 0;
            length--;
        }
        current = current->next;
    }
    *prime_count = length;
}

void display(int count)
{
    if(count == 0){
        printf("There are no prime numbers\n");
        exit(-1);
    }
    else{
        current = first;
        (count == 1) ? printf("The prime number is: ") : printf("The prime numbers are: ");
        while(current->next){
            if(current->prime_check)
                printf("%d ", current->value);
            current = current->next;
        }
    }
    putchar('\n');
}
