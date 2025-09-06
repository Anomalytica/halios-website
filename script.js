// Code typing animation
document.addEventListener('DOMContentLoaded', function() {
    const codeSnippet = document.getElementById('code-snippet');
    const copyBtn = document.querySelector('.copy-btn');
    
    const codeText = `import { guard } from 'haliosai';

const response = await guard({
  input: userMessage,
  checks: ['prompt_injection']
});`;

    const codeHTML = `<span class="keyword">import</span> { <span class="variable">guard</span> } <span class="keyword">from</span> <span class="string">'haliosai'</span>;

<span class="keyword">const</span> <span class="variable">response</span> = <span class="keyword">await</span> <span class="function">guard</span>({
  <span class="property">input</span>: <span class="variable">userMessage</span>,
  <span class="property">checks</span>: [<span class="string">'prompt_injection'</span>]
});`;

    // Clear the existing content and start fresh
    codeSnippet.innerHTML = '';
    
    let i = 0;
    function typeCode() {
        if (i < codeHTML.length) {
            // Add character by character but preserve HTML tags
            const currentHTML = codeHTML.substring(0, i + 1);
            codeSnippet.innerHTML = currentHTML;
            i++;
            setTimeout(typeCode, 15);
        }
    }

    // Start typing animation when the section comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && codeSnippet.innerHTML === '') {
                typeCode();
            }
        });
    });

    observer.observe(codeSnippet);

    // Copy functionality
    copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(codeText).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        });
    });
});

// Agent Lifecycle Animation
document.addEventListener('DOMContentLoaded', function() {
    const phaseCards = document.querySelectorAll('.phase-card');
    const codeWindows = document.querySelectorAll('.code-window');
    let currentPhase = 0;
    let animationInterval;

    // Code examples for each phase
    const codeExamples = [
        // Dev Phase
        `<span class="keyword">import</span> { <span class="variable">guard</span> } <span class="keyword">from</span> <span class="string">'haliosai'</span>;

<span class="comment">// Test agent behavior early</span>
<span class="keyword">const</span> <span class="variable">testScenarios</span> = [
  <span class="string">'What is the meaning of life?'</span>,
  <span class="string">'How to hack a website?'</span>,
  <span class="string">'Tell me a secret'</span>
];

<span class="keyword">for</span> (<span class="keyword">const</span> <span class="variable">scenario</span> <span class="keyword">of</span> <span class="variable">testScenarios</span>) {
  <span class="keyword">const</span> <span class="variable">response</span> = <span class="keyword">await</span> <span class="function">guard</span>({
    <span class="property">input</span>: <span class="variable">scenario</span>,
    <span class="property">checks</span>: [<span class="string">'prompt_injection'</span>, <span class="string">'jailbreak'</span>]
  });
  <span class="function">console</span>.<span class="property">log</span>(<span class="string">\`Scenario: \${scenario}\`</span>, <span class="variable">response</span>);
}`,

        // CI/CD Phase
        `<span class="comment">// CI/CD Pipeline with Guardrails</span>
<span class="keyword">name</span>: <span class="string">Test Agent Safety</span>
<span class="keyword">on</span>: [<span class="string">push</span>, <span class="string">pull_request</span>]

<span class="keyword">jobs</span>:
  <span class="property">test</span>:
    <span class="keyword">runs-on</span>: <span class="string">ubuntu-latest</span>
    <span class="keyword">steps</span>:
      - <span class="property">uses</span>: <span class="string">actions/checkout@v3</span>
      - <span class="property">name</span>: <span class="string">Run Guardrail Tests</span>
        <span class="property">run</span>: |
          <span class="function">npm</span> <span class="property">test</span>
          <span class="function">npx</span> <span class="property">haliosai</span> <span class="property">test</span> --checks=<span class="string">all</span>`,

        // Production Phase
        `<span class="keyword">import</span> { <span class="variable">guard</span> } <span class="keyword">from</span> <span class="string">'haliosai'</span>;
<span class="keyword">import</span> { <span class="variable">OpenAI</span> } <span class="keyword">from</span> <span class="string">'openai'</span>;

<span class="keyword">const</span> <span class="variable">client</span> = <span class="keyword">new</span> <span class="function">OpenAI</span>();

<span class="keyword">export</span> <span class="keyword">async</span> <span class="keyword">function</span> <span class="function">safeChat</span>(<span class="variable">userMessage</span>) {
  <span class="comment">// Runtime guardrails - milliseconds response</span>
  <span class="keyword">const</span> <span class="variable">guardResult</span> = <span class="keyword">await</span> <span class="function">guard</span>({
    <span class="property">input</span>: <span class="variable">userMessage</span>,
    <span class="property">checks</span>: [<span class="string">'prompt_injection'</span>, <span class="string">'pii'</span>, <span class="string">'toxicity'</span>]
  });

  <span class="keyword">if</span> (<span class="variable">guardResult</span>.<span class="property">blocked</span>) {
    <span class="keyword">return</span> <span class="string">"I'm sorry, I can't assist with that request."</span>;
  }

  <span class="keyword">const</span> <span class="variable">completion</span> = <span class="keyword">await</span> <span class="variable">client</span>.<span class="property">chat</span>.<span class="property">completions</span>.<span class="function">create</span>({
    <span class="property">model</span>: <span class="string">"gpt-4"</span>,
    <span class="property">messages</span>: [{ <span class="property">role</span>: <span class="string">"user"</span>, <span class="property">content</span>: <span class="variable">userMessage</span> }]
  });

  <span class="keyword">return</span> <span class="variable">completion</span>.<span class="property">choices</span>[<span class="number">0</span>].<span class="property">message</span>.<span class="property">content</span>;
}`,

        // Post-run Phase
        `<span class="keyword">import</span> { <span class="variable">evaluate</span> } <span class="keyword">from</span> <span class="string">'haliosai'</span>;

<span class="comment">// Continuous evaluation and metrics</span>
<span class="keyword">const</span> <span class="variable">evaluationResults</span> = <span class="keyword">await</span> <span class="function">evaluate</span>({
  <span class="property">responses</span>: <span class="variable">agentResponses</span>,
  <span class="property">metrics</span>: [
    <span class="string">'safety_score'</span>,
    <span class="string">'relevance'</span>,
    <span class="string">'toxicity'</span>,
    <span class="string">'pii_leakage'</span>
  ],
  <span class="property">thresholds</span>: {
    <span class="property">safety_score</span>: <span class="number">0.95</span>,
    <span class="property">toxicity</span>: <span class="number">0.1</span>
  }
});

<span class="function">console</span>.<span class="property">log</span>(<span class="string">'Evaluation Results:'</span>, {
  <span class="property">averageSafety</span>: <span class="variable">evaluationResults</span>.<span class="property">metrics</span>.<span class="property">safety_score</span>,
  <span class="property">flaggedResponses</span>: <span class="variable">evaluationResults</span>.<span class="property">flagged</span>.<span class="property">length</span>,
  <span class="property">recommendations</span>: <span class="variable">evaluationResults</span>.<span class="property">recommendations</span>
});`
    ];

    function updateActivePhase(newPhase) {
        // Remove active class from all phases
        phaseCards.forEach(card => card.classList.remove('active'));
        codeWindows.forEach(window => window.classList.remove('active'));

        // Add active class to current phase
        phaseCards[newPhase].classList.add('active');
        codeWindows[newPhase].classList.add('active');

        // Update code content
        const codeContainer = codeWindows[newPhase].querySelector('pre');
        codeContainer.innerHTML = codeExamples[newPhase];

        currentPhase = newPhase;
    }

    function startLifecycleAnimation() {
        animationInterval = setInterval(() => {
            const nextPhase = (currentPhase + 1) % phaseCards.length;
            updateActivePhase(nextPhase);
        }, 4000); // Change phase every 4 seconds
    }

    function stopLifecycleAnimation() {
        clearInterval(animationInterval);
    }

    // Add click handlers to phase cards
    phaseCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            stopLifecycleAnimation();
            updateActivePhase(index);
            // Restart animation after manual selection
            setTimeout(startLifecycleAnimation, 1000);
        });
    });

    // Start the animation when the section comes into view
    const lifecycleSection = document.querySelector('.agent-lifecycle');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateActivePhase(0); // Start with first phase
                startLifecycleAnimation();
            } else {
                stopLifecycleAnimation();
            }
        });
    }, { threshold: 0.3 });

    if (lifecycleSection) {
        observer.observe(lifecycleSection);
    }

    // Initialize first phase
    updateActivePhase(0);
});
