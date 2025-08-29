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
