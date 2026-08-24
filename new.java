class Stack {
    int[] stk = new int[10];
    int top = -1;

    // Push method
    void push(int value) {
        if (top == 9) {
            System.out.println("Stack is Full");
        } else {
            stk[++top] = value;
        }
    }

    // Pop method
    void pop() {
        if (top == -1) {
            System.out.println("Stack Underflow");
        } else {
            System.out.println("Deleted element: " + stk[top--]);
        }
    }

    // Display method
    void display() {
        if (top == -1) {
            System.out.println("Stack is Empty");
        } else {
            System.out.println("Stack elements:");
            for (int i = top; i >= 0; i--) {
                System.out.println(stk[i]);
            }
        }
    }

    public static void main(String[] args) {
        Stack s = new Stack();

        s.push(10);

        s.display();

        s.pop();

        s.display();
    }
}