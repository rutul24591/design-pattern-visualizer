import { Pattern } from "@/types/pattern";

export const observerPattern: Pattern = {
  id: "observer",
  name: "Observer",
  category: "behavioral",
  description:
    "Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.",
  intent:
    "The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.",
  motivation:
    "When you need to maintain consistency between related objects without making them tightly coupled, the Observer pattern is useful. It's particularly useful for implementing distributed event handling systems.",
  structure:
    "The pattern involves a Subject that maintains a list of Observers and notifies them of state changes. Observers register with the Subject to receive updates.",
  participants: [
    "Subject - knows its observers and provides an interface for attaching and detaching Observer objects",
    "Observer - defines an updating interface for objects that should be notified of changes",
    "ConcreteSubject - stores state of interest to ConcreteObserver objects",
    "ConcreteObserver - maintains a reference to a ConcreteSubject and implements the Observer updating interface",
  ],
  collaboration:
    "ConcreteSubject notifies its observers whenever a change occurs. After being informed of a change in the subject, a ConcreteObserver may query the subject for information.",
  consequences: {
    pros: [
      "Loose coupling between Subject and Observer",
      "Support for broadcast communication",
      "Dynamic relationships between objects",
      "Follows Open/Closed Principle",
    ],
    cons: [
      "Unexpected updates can occur",
      "Memory leaks if observers are not properly unregistered",
      "Order of notification is not guaranteed",
      "Can lead to performance issues with many observers",
    ],
  },
  implementation: {
    considerations: [
      "Decide who triggers the update (Subject or Observers)",
      "Consider using weak references to prevent memory leaks",
      "Think about update granularity",
      "Handle observer removal during notification",
    ],
    tips: [
      "Provide methods for registering and unregistering observers",
      "Consider using events or callbacks for notifications",
      "Document the update protocol clearly",
      "Consider using weak references in languages that support them",
    ],
  },
  useCases: [
    "Event handling systems",
    "Model-View-Controller (MVC) architecture",
    "Real-time data updates",
    "Pub/sub messaging systems",
    "Social media notifications",
    "Stock price monitoring",
  ],
  relatedPatterns: [
    "singleton",
  ],
  example: {
    title: "Newsletter Subscription System",
    description:
      "A newsletter system where subscribers are notified when new content is published.",
    code: `interface Observer {
  update(message: string): void;
}

class ConcreteObserver implements Observer {
  constructor(private name: string) {}

  update(message: string): void {
    console.log(\`\${this.name} received: \${message}\`);
  }
}

class Subject {
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    this.observers.push(observer);
    console.log('Observer attached');
  }

  detach(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
      console.log('Observer detached');
    }
  }

  notify(message: string): void {
    console.log(\`Notifying \${this.observers.length} observers...\`);
    for (const observer of this.observers) {
      observer.update(message);
    }
  }
}

// Usage
const newsletter = new Subject();

const subscriber1 = new ConcreteObserver('Alice');
const subscriber2 = new ConcreteObserver('Bob');

newsletter.attach(subscriber1);
newsletter.attach(subscriber2);

newsletter.notify('New article published!');

newsletter.detach(subscriber1);
newsletter.notify('Another article published!');`,
  },
  code: `interface Observer {
  update(message: string): void;
}

class ConcreteObserver implements Observer {
  constructor(private name: string) {}

  update(message: string): void {
    console.log(\`\${this.name} received: \${message}\`);
  }
}

class Subject {
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    this.observers.push(observer);
    console.log('Observer attached');
  }

  detach(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
      console.log('Observer detached');
    }
  }

  notify(message: string): void {
    console.log(\`Notifying \${this.observers.length} observers...\`);
    for (const observer of this.observers) {
      observer.update(message);
    }
  }
}

// Usage
const newsletter = new Subject();

const subscriber1 = new ConcreteObserver('Alice');
const subscriber2 = new ConcreteObserver('Bob');

newsletter.attach(subscriber1);
newsletter.attach(subscriber2);

newsletter.notify('New article published!');

newsletter.detach(subscriber1);
newsletter.notify('Another article published!');`,
};

export const strategyPattern: Pattern = {
  id: "strategy",
  name: "Strategy",
  category: "behavioral",
  description:
    "Defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.",
  intent:
    "The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.",
  motivation:
    "When you have multiple algorithms for a specific task and want the client to choose which algorithm to use at runtime, the Strategy pattern is useful. It's an alternative to conditional statements.",
  structure:
    "The pattern involves a Strategy interface that defines an algorithm. ConcreteStrategy classes implement different versions of the algorithm. A Context class uses a Strategy.",
  participants: [
    "Strategy - declares an interface common to all supported algorithms",
    "ConcreteStrategy - implements the algorithm using the Strategy interface",
    "Context - is configured with a ConcreteStrategy object and maintains a reference to a Strategy object",
  ],
  collaboration:
    "Strategy and Context interact to implement the chosen algorithm. A context forwards requests from its clients to its strategy.",
  consequences: {
    pros: [
      "Families of related algorithms",
      "Alternative to subclassing",
      "Eliminates conditional statements",
      "Provides different implementations of the same behavior",
    ],
    cons: [
      "Clients must be aware of different strategies",
      "Communication overhead between Strategy and Context",
      "Increased number of objects",
    ],
  },
  implementation: {
    considerations: [
      "Define Strategy and Context interfaces carefully",
      "Consider whether strategies need data from Context",
      "Think about strategy selection mechanism",
    ],
    tips: [
      "Use dependency injection for strategies",
      "Consider using function objects for simple strategies",
      "Make strategies stateless when possible",
      "Document when to use which strategy",
    ],
  },
  useCases: [
    "Different sorting algorithms",
    "Payment methods",
    "Compression algorithms",
    "Route planning strategies",
    "Validation rules",
  ],
  relatedPatterns: ["state"],
  example: {
    title: "Payment Strategy",
    description:
      "Different payment strategies for an e-commerce system.",
    code: `interface PaymentStrategy {
  pay(amount: number): string;
}

class CreditCardPayment implements PaymentStrategy {
  constructor(private cardNumber: string) {}

  pay(amount: number): string {
    return \`Paid $\${amount} using Credit Card ending in \${this.cardNumber.slice(-4)}\`;
  }
}

class PayPalPayment implements PaymentStrategy {
  constructor(private email: string) {}

  pay(amount: number): string {
    return \`Paid $\${amount} using PayPal account \${this.email}\`;
  }
}

class CryptoPayment implements PaymentStrategy {
  constructor(private walletAddress: string) {}

  pay(amount: number): string {
    return \`Paid $\${amount} using Crypto wallet \${this.walletAddress.substring(0, 10)}...\`;
  }
}

class ShoppingCart {
  private paymentStrategy?: PaymentStrategy;

  setPaymentStrategy(strategy: PaymentStrategy): void {
    this.paymentStrategy = strategy;
  }

  checkout(amount: number): string {
    if (!this.paymentStrategy) {
      return 'Please select a payment method';
    }
    return this.paymentStrategy.pay(amount);
  }
}

// Usage
const cart = new ShoppingCart();

cart.setPaymentStrategy(new CreditCardPayment('1234567890123456'));
console.log(cart.checkout(100));

cart.setPaymentStrategy(new PayPalPayment('user@example.com'));
console.log(cart.checkout(200));

cart.setPaymentStrategy(new CryptoPayment('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'));
console.log(cart.checkout(300));`,
  },
  code: `interface PaymentStrategy {
  pay(amount: number): string;
}

class CreditCardPayment implements PaymentStrategy {
  constructor(private cardNumber: string) {}

  pay(amount: number): string {
    return \`Paid $\${amount} using Credit Card ending in \${this.cardNumber.slice(-4)}\`;
  }
}

class PayPalPayment implements PaymentStrategy {
  constructor(private email: string) {}

  pay(amount: number): string {
    return \`Paid $\${amount} using PayPal account \${this.email}\`;
  }
}

class CryptoPayment implements PaymentStrategy {
  constructor(private walletAddress: string) {}

  pay(amount: number): string {
    return \`Paid $\${amount} using Crypto wallet \${this.walletAddress.substring(0, 10)}...\`;
  }
}

class ShoppingCart {
  private paymentStrategy?: PaymentStrategy;

  setPaymentStrategy(strategy: PaymentStrategy): void {
    this.paymentStrategy = strategy;
  }

  checkout(amount: number): string {
    if (!this.paymentStrategy) {
      return 'Please select a payment method';
    }
    return this.paymentStrategy.pay(amount);
  }
}

// Usage
const cart = new ShoppingCart();

cart.setPaymentStrategy(new CreditCardPayment('1234567890123456'));
console.log(cart.checkout(100));

cart.setPaymentStrategy(new PayPalPayment('user@example.com'));
console.log(cart.checkout(200));

cart.setPaymentStrategy(new CryptoPayment('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'));
console.log(cart.checkout(300));`,
};

export const commandPattern: Pattern = {
  id: "command",
  name: "Command",
  category: "behavioral",
  description:
    "Encapsulates a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.",
  intent:
    "The Command pattern encapsulates a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.",
  motivation:
    "When you need to issue requests to objects without knowing anything about the operation being requested or the receiver of the request, the Command pattern is useful. It decouples the object that invokes the operation from the one that knows how to perform it.",
  structure:
    "The pattern involves a Command interface that declares an execution method. ConcreteCommand classes implement Command and invoke operations on a Receiver. An Invoker asks the command to carry out the request.",
  participants: [
    "Command - declares an interface for executing an operation",
    "ConcreteCommand - defines a binding between a Receiver object and an action",
    "Client - creates a ConcreteCommand object and sets its receiver",
    "Invoker - asks the command to carry out the request",
    "Receiver - knows how to perform the operations",
  ],
  collaboration:
    "The client creates a ConcreteCommand object and specifies its receiver. An Invoker stores the ConcreteCommand object. The invoker issues a request by calling execute on the command.",
  consequences: {
    pros: [
      "Decouples the object that invokes the operation from the one that knows how to perform it",
      "Commands can be assembled into a composite command",
      "Easy to add new commands",
      "Supports undo/redo operations",
    ],
    cons: [
      "Increases the number of classes",
      "Can complicate the codebase",
    ],
  },
  implementation: {
    considerations: [
      "Decide how intelligent commands should be",
      "Consider supporting undo operations",
      "Think about command queuing",
      "Plan for command history",
    ],
    tips: [
      "Keep commands simple and focused",
      "Store state for undo operations",
      "Consider using a command queue",
      "Document the receiver's operations",
    ],
  },
  useCases: [
    "GUI buttons and menu items",
    "Transaction systems",
    "Macro recording",
    "Undo/redo functionality",
    "Job queues",
  ],
  relatedPatterns: ["composite", "prototype"],
  example: {
    title: "Text Editor Commands",
    description:
      "Commands for a text editor with undo functionality.",
    code: `interface Command {
  execute(): void;
  undo(): void;
}

class TextEditor {
  private text: string = '';

  getText(): string {
    return this.text;
  }

  addText(newText: string): void {
    this.text += newText;
  }

  deleteText(length: number): void {
    this.text = this.text.slice(0, -length);
  }
}

class AddTextCommand implements Command {
  constructor(
    private editor: TextEditor,
    private textToAdd: string
  ) {}

  execute(): void {
    this.editor.addText(this.textToAdd);
  }

  undo(): void {
    this.editor.deleteText(this.textToAdd.length);
  }
}

class CommandManager {
  private history: Command[] = [];

  executeCommand(command: Command): void {
    command.execute();
    this.history.push(command);
  }

  undo(): void {
    const command = this.history.pop();
    if (command) {
      command.undo();
    }
  }
}

// Usage
const editor = new TextEditor();
const manager = new CommandManager();

manager.executeCommand(new AddTextCommand(editor, 'Hello '));
console.log('Text:', editor.getText());

manager.executeCommand(new AddTextCommand(editor, 'World!'));
console.log('Text:', editor.getText());

manager.undo();
console.log('After undo:', editor.getText());

manager.undo();
console.log('After undo:', editor.getText());`,
  },
  code: `interface Command {
  execute(): void;
  undo(): void;
}

class TextEditor {
  private text: string = '';

  getText(): string {
    return this.text;
  }

  addText(newText: string): void {
    this.text += newText;
  }

  deleteText(length: number): void {
    this.text = this.text.slice(0, -length);
  }
}

class AddTextCommand implements Command {
  constructor(
    private editor: TextEditor,
    private textToAdd: string
  ) {}

  execute(): void {
    this.editor.addText(this.textToAdd);
  }

  undo(): void {
    this.editor.deleteText(this.textToAdd.length);
  }
}

class CommandManager {
  private history: Command[] = [];

  executeCommand(command: Command): void {
    command.execute();
    this.history.push(command);
  }

  undo(): void {
    const command = this.history.pop();
    if (command) {
      command.undo();
    }
  }
}

// Usage
const editor = new TextEditor();
const manager = new CommandManager();

manager.executeCommand(new AddTextCommand(editor, 'Hello '));
console.log('Text:', editor.getText());

manager.executeCommand(new AddTextCommand(editor, 'World!'));
console.log('Text:', editor.getText());

manager.undo();
console.log('After undo:', editor.getText());

manager.undo();
console.log('After undo:', editor.getText());`,
};

export const statePattern: Pattern = {
  id: "state",
  name: "State",
  category: "behavioral",
  description:
    "Allows an object to alter its behavior when its internal state changes. The object will appear to change its class.",
  intent:
    "The State pattern allows an object to alter its behavior when its internal state changes. The object will appear to change its class.",
  motivation:
    "When an object's behavior depends on its state and it must change its behavior at runtime depending on that state, the State pattern is useful. It's an alternative to large conditional statements.",
  structure:
    "The pattern involves a State interface that declares state-specific behavior. ConcreteState classes implement behavior associated with a state of the Context. A Context maintains an instance of a ConcreteState that defines the current state.",
  participants: [
    "Context - defines the interface of interest to clients and maintains an instance of a ConcreteState",
    "State - defines an interface for encapsulating the behavior associated with a particular state",
    "ConcreteState - each subclass implements a behavior associated with a state of Context",
  ],
  collaboration:
    "Context delegates state-specific requests to the current ConcreteState object. A context may pass itself as an argument to the State object. Either Context or ConcreteState can decide which state succeeds another.",
  consequences: {
    pros: [
      "Localizes state-specific behavior",
      "Makes state transitions explicit",
      "State objects can be shared",
      "Eliminates large conditional statements",
    ],
    cons: [
      "Increases the number of classes",
      "Can be overkill for simple state machines",
    ],
  },
  implementation: {
    considerations: [
      "Decide who defines state transitions",
      "Consider creating and destroying State objects",
      "Think about state sharing",
      "Plan the state transition table",
    ],
    tips: [
      "Keep states focused on specific behavior",
      "Consider using a state factory",
      "Document state transitions clearly",
      "Use enums or constants for state identification",
    ],
  },
  useCases: [
    "TCP connection states",
    "Document approval workflows",
    "Vending machines",
    "Game character states",
    "Order processing",
  ],
  relatedPatterns: ["strategy", "singleton"],
  example: {
    title: "Order State Machine",
    description:
      "An order processing system with different states.",
    code: `interface OrderState {
  cancel(): string;
  ship(): string;
  receive(): string;
}

class PendingState implements OrderState {
  constructor(private order: Order) {}

  cancel(): string {
    this.order.setState(new CancelledState(this.order));
    return 'Order cancelled';
  }

  ship(): string {
    this.order.setState(new ShippedState(this.order));
    return 'Order shipped';
  }

  receive(): string {
    return 'Cannot receive pending order';
  }
}

class ShippedState implements OrderState {
  constructor(private order: Order) {}

  cancel(): string {
    return 'Cannot cancel shipped order';
  }

  ship(): string {
    return 'Order already shipped';
  }

  receive(): string {
    this.order.setState(new DeliveredState(this.order));
    return 'Order delivered';
  }
}

class DeliveredState implements OrderState {
  constructor(private order: Order) {}

  cancel(): string {
    return 'Cannot cancel delivered order';
  }

  ship(): string {
    return 'Order already delivered';
  }

  receive(): string {
    return 'Order already delivered';
  }
}

class CancelledState implements OrderState {
  constructor(private order: Order) {}

  cancel(): string {
    return 'Order already cancelled';
  }

  ship(): string {
    return 'Cannot ship cancelled order';
  }

  receive(): string {
    return 'Cannot receive cancelled order';
  }
}

class Order {
  private state: OrderState;

  constructor() {
    this.state = new PendingState(this);
  }

  setState(state: OrderState): void {
    this.state = state;
  }

  cancel(): string {
    return this.state.cancel();
  }

  ship(): string {
    return this.state.ship();
  }

  receive(): string {
    return this.state.receive();
  }
}

// Usage
const order = new Order();

console.log(order.ship());
console.log(order.receive());
console.log(order.cancel());
console.log(order.ship());`,
  },
  code: `interface OrderState {
  cancel(): string;
  ship(): string;
  receive(): string;
}

class PendingState implements OrderState {
  constructor(private order: Order) {}

  cancel(): string {
    this.order.setState(new CancelledState(this.order));
    return 'Order cancelled';
  }

  ship(): string {
    this.order.setState(new ShippedState(this.order));
    return 'Order shipped';
  }

  receive(): string {
    return 'Cannot receive pending order';
  }
}

class ShippedState implements OrderState {
  constructor(private order: Order) {}

  cancel(): string {
    return 'Cannot cancel shipped order';
  }

  ship(): string {
    return 'Order already shipped';
  }

  receive(): string {
    this.order.setState(new DeliveredState(this.order));
    return 'Order delivered';
  }
}

class DeliveredState implements OrderState {
  constructor(private order: Order) {}

  cancel(): string {
    return 'Cannot cancel delivered order';
  }

  ship(): string {
    return 'Order already delivered';
  }

  receive(): string {
    return 'Order already delivered';
  }
}

class CancelledState implements OrderState {
  constructor(private order: Order) {}

  cancel(): string {
    return 'Order already cancelled';
  }

  ship(): string {
    return 'Cannot ship cancelled order';
  }

  receive(): string {
    return 'Cannot receive cancelled order';
  }
}

class Order {
  private state: OrderState;

  constructor() {
    this.state = new PendingState(this);
  }

  setState(state: OrderState): void {
    this.state = state;
  }

  cancel(): string {
    return this.state.cancel();
  }

  ship(): string {
    return this.state.ship();
  }

  receive(): string {
    return this.state.receive();
  }
}

// Usage
const order = new Order();

console.log(order.ship());
console.log(order.receive());
console.log(order.cancel());
console.log(order.ship());`,
};

export const behavioralPatterns = [
  observerPattern,
  strategyPattern,
  commandPattern,
  statePattern,
];
