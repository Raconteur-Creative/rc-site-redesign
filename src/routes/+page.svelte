<script>
	import { onMount } from 'svelte';
	import lottie from 'lottie-web';
	
	let typingText = '';
	const words = ["advocacy", "agents", "comms", "campaigns", "strategy"];
	let wordIndex = 0;
	let charIndex = 0;
	let isDeleting = false;
	
	let roboContainer;
	let spacecraftContainer;
	let progressValue = 0;
	
	function type() {
		const currentWord = words[wordIndex];
		
		if (isDeleting) {
			typingText = currentWord.substring(0, charIndex - 1);
			charIndex--;
		} else {
			typingText = currentWord.substring(0, charIndex + 1);
			charIndex++;
		}

		let typeSpeed = isDeleting ? 50 : 150;

		if (!isDeleting && charIndex === currentWord.length) {
			typeSpeed = 2000;
			isDeleting = true;
		} else if (isDeleting && charIndex === 0) {
			isDeleting = false;
			wordIndex = (wordIndex + 1) % words.length;
			typeSpeed = 500;
		}

		setTimeout(type, typeSpeed);
	}
	
	function animateProgress() {
		const duration = 3000; // 3 seconds
		const startTime = Date.now();
		
		function updateProgress() {
			const elapsed = Date.now() - startTime;
			const progress = Math.min(elapsed / duration, 1);
			progressValue = Math.floor(progress * 100);
			
			if (progress < 1) {
				requestAnimationFrame(updateProgress);
			}
		}
		
		updateProgress();
	}
	
	onMount(() => {
		type();
		
		// Load robot Lottie animation
		if (roboContainer) {
			lottie.loadAnimation({
				container: roboContainer,
				renderer: 'svg',
				loop: true,
				autoplay: true,
				path: '/robo.json'
			});
		}
		
		// Load spacecraft Lottie animation
		if (spacecraftContainer) {
			lottie.loadAnimation({
				container: spacecraftContainer,
				renderer: 'svg',
				loop: true,
				autoplay: true,
				path: '/spacecraft.json'
			});
		}
		
		// Trigger progress animation after a short delay
		setTimeout(animateProgress, 1000);
	});
</script>

<svelte:head>
	<title>Raconteur Creative | Technical Autocracy via AI</title>
	<meta name="description" content="High-stakes communication engine powered by custom agentic workflows" />
</svelte:head>

<div class="fixed inset-0 noise-bg z-[100]"></div>
<!-- Navigation -->
<nav class="fixed top-0 w-full z-50 bg-[#121416]/60 backdrop-blur-xl border-none">
<div class="flex justify-between items-center w-full px-8 py-6 max-w-full mx-auto">
<div class="flex items-center">
<img alt="Raconteur Logo" class="h-10 w-auto" src="https://lh3.googleusercontent.com/aida/ADBb0uiqc1awPCpSVAsUlHIxSL8LG-GeNfH5gpjtaEkfZ147eU5zRrYTb1ocU3gbkOlKrD6qKnU3zfWnjtiQEZHhOKOOnmpVdgWv2QRA3xnIpHMgc7lmEvXQXmKAgFAwHzymozCUK0rv19W-LOQg4nXu__NvruM9H9wKs2GwLvart3Y6-tuy1if3D04khkRmK9PpWrAHa3I6Zvbe8C4TwB-vx7RNDF3EyH--Q5fbR3vDVmDPpQLOqn85Z37lk4EibW0PS19lSkGhlZPL220"/>
</div>
<div class="hidden md:flex items-center gap-10">
<a class="text-primary font-medium hover:text-secondary transition-colors font-label text-xs uppercase tracking-widest" href="#services">Services</a>
<a class="text-primary font-medium hover:text-secondary transition-colors font-label text-xs uppercase tracking-widest" href="#agents">AI Agents</a>
<a class="text-primary font-medium hover:text-secondary transition-colors font-label text-xs uppercase tracking-widest" href="#faq">FAQs</a>
<a class="bg-secondary text-on-secondary px-6 py-2 font-bold hover:opacity-90 transition-all text-xs uppercase tracking-tighter flex items-center gap-2" href="#contact">Contact <span class="material-symbols-outlined text-[14px] pulse-icon">bolt</span></a>
</div>
<button class="md:hidden text-primary">
<span class="material-symbols-outlined">menu</span>
</button>
</div>
</nav>
<main>
<!-- Hero Section -->
<section class="min-h-screen flex flex-col justify-center pt-24 px-8 md:px-20 relative overflow-hidden bg-surface">
<div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-container/10 to-transparent"></div>
<div class="max-w-7xl mx-auto w-full grid md:grid-cols-12 gap-12 items-center">
<div class="md:col-span-7 z-10">
<h1 class="font-headline text-6xl md:text-[8rem] leading-[0.85] tracking-tighter text-on-surface mb-8">
                    Intelligent<br/>
<span class="typing-container">
<span>{typingText}</span>
</span>
</h1>
<p class="font-body text-xl md:text-2xl text-on-surface-variant max-w-xl mb-12 font-light leading-relaxed">
                    High-stakes communication engine powered by custom agentic workflows. We don't just tell stories; we automate influence.
                </p>
<div class="flex flex-wrap gap-4">
<button class="bg-secondary text-on-secondary px-10 py-5 text-lg font-extrabold flex items-center gap-3 hover:gap-5 transition-all">
                        Start a project <span class="material-symbols-outlined pulse-icon">arrow_forward</span>
</button>
<button class="border border-outline-variant/30 text-primary px-10 py-5 text-lg font-bold hover:bg-primary/10 transition-colors">
                        See AI services
                    </button>
</div>
</div>
<!-- Terminal Console -->
<div class="md:col-span-5 relative group">
<div class="bg-surface-container-lowest p-1 border border-outline-variant/20 shadow-2xl">
<div class="bg-surface-container-high px-4 py-2 flex items-center gap-2 border-b border-outline-variant/10">
<div class="flex gap-1.5">
<div class="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
<div class="w-2.5 h-2.5 rounded-full bg-secondary/40"></div>
<div class="w-2.5 h-2.5 rounded-full bg-primary/40"></div>
</div>
<span class="text-[10px] font-label text-outline uppercase tracking-widest ml-4">agent_node_v4.0.1</span>
</div>
<div class="p-6 font-mono text-sm leading-relaxed min-h-[320px] bg-black/40">
<div class="text-primary mb-2 opacity-80">&gt; Initializing Intelligence_Core...</div>
<div class="text-secondary mb-2">&gt; Protocol: ADVOCACY_CAMPAIGN_ALPHA</div>
<div class="text-tertiary mb-4">&gt; Agent_Mode: <span class="text-on-surface animate-pulse">ACTIVE</span></div>
<div class="text-on-surface/60 text-xs leading-loose">
━━━━━━━━━━━━━━━━━━━━━━━━━<br/>
<span class="text-primary">●</span> Sentiment_Tracker <span class="text-secondary">✓</span><br/>
<span class="text-primary">●</span> Message_Generator <span class="text-secondary">✓</span><br/>
<span class="text-primary">●</span> Influence_Predictor <span class="text-secondary">✓</span><br/>
━━━━━━━━━━━━━━━━━━━━━━━━━<br/>
<br/>
<span class="text-tertiary">Audience_Segments:</span> 4.2M mapped<br/>
<span class="text-tertiary">Tactical_Output:</span> 120 briefs/hour<br/>
<span class="text-tertiary">System_Efficiency:</span> <span class="text-secondary font-bold">{progressValue}% Optimized</span>
</div>
<div class="flex gap-2 mt-6">
<div class="h-1.5 flex-1 bg-surface-container overflow-hidden">
<div class="h-full bg-gradient-to-r from-secondary via-tertiary to-primary transition-all duration-300 ease-out" style="width: {progressValue}%"></div>
</div>
</div>
<div class="text-[10px] text-outline mt-4 font-label tracking-widest">&gt; REAL-TIME OPTIMIZATION IN PROGRESS...</div>
</div>
</div>
</div>
</div>
</section>

<!-- Services Section -->
<section id="services" class="py-32 px-8 md:px-20 bg-surface-container-low relative">
<div class="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-primary-container/5 to-transparent"></div>
<div class="max-w-7xl mx-auto relative z-10">
<div class="mb-20">
<p class="font-label text-xs uppercase tracking-[0.3em] text-outline mb-4">━━ 01 SERVICES</p>
<h2 class="font-headline text-5xl md:text-7xl tracking-tighter text-on-surface leading-[0.9]">
                    Precision-built<br/>for power.
                </h2>
</div>
<div class="grid md:grid-cols-3 gap-8">
<!-- Web Design & Development -->
<div class="bg-surface-container p-8 border-l-2 border-secondary hover:border-primary transition-colors">
<div class="mb-6 w-14 h-14 bg-primary-container flex items-center justify-center globe-hover">
<span class="material-symbols-outlined text-primary text-3xl">language</span>
</div>
<h3 class="font-headline text-2xl text-on-surface mb-4">Web Design & Development</h3>
<p class="text-on-surface-variant leading-relaxed font-body">
                        Corporate sites, campaign portals, and digital infrastructure that performs under pressure. Fast, secure, scalable.
                    </p>
</div>
<!-- Graphic Design -->
<div class="bg-surface-container p-8 border-l-2 border-tertiary hover:border-primary transition-colors">
<div class="mb-6 w-14 h-14 bg-tertiary-container flex items-center justify-center pencil-hover">
<span class="material-symbols-outlined text-tertiary text-3xl">edit</span>
</div>
<h3 class="font-headline text-2xl text-on-surface mb-4">Graphic Design</h3>
<p class="text-on-surface-variant leading-relaxed font-body">
                        Brand systems, slide decks, reports, and visuals that command attention in boardrooms and broadcasts.
                    </p>
</div>
<!-- Digital Audit & Consulting -->
<div class="bg-surface-container p-8 border-l-2 border-secondary hover:border-primary transition-colors">
<div class="mb-6 w-14 h-14 bg-secondary-container flex items-center justify-center checkmark-hover">
<span class="material-symbols-outlined text-secondary text-3xl">check_circle</span>
</div>
<h3 class="font-headline text-2xl text-on-surface mb-4">Digital Audit & Consulting</h3>
<p class="text-on-surface-variant leading-relaxed font-body">
                        We analyze your digital footprint, identify gaps, and recommend optimizations that drive measurable outcomes.
                    </p>
</div>
</div>
</div>
</section>

<!-- AI Agents Section -->
<section id="agents" class="py-32 px-8 md:px-20 bg-surface relative overflow-hidden">
<div class="absolute right-0 top-1/4 w-96 h-96 bg-gradient-radial from-primary/5 via-transparent to-transparent"></div>
<div class="max-w-7xl mx-auto relative z-10">
<div class="mb-20 text-right">
<p class="font-label text-xs uppercase tracking-[0.3em] text-outline mb-4">━━ 02 AGENTIC AI</p>
<h2 class="font-headline text-5xl md:text-7xl tracking-tighter text-on-surface leading-[0.9]">
                    Intelligence at<br/>industrial scale.
                </h2>
</div>
<div class="grid md:grid-cols-2 gap-16 items-center">
<div class="order-2 md:order-1">
<div class="mb-12">
<h3 class="font-headline text-3xl text-on-surface mb-4">Content Generation</h3>
<p class="text-on-surface-variant leading-relaxed font-body">
                            AI agents that draft op-eds, generate talking points, and produce strategic messaging at speed. Human-reviewed, machine-accelerated.
                        </p>
</div>
<div class="mb-12">
<h3 class="font-headline text-3xl text-on-surface mb-4">Research & Intelligence</h3>
<p class="text-on-surface-variant leading-relaxed font-body">
                            Automated monitoring of news, policy developments, and sentiment trends. Real-time briefs delivered to your inbox.
                        </p>
</div>
<div>
<h3 class="font-headline text-3xl text-on-surface mb-4">Workflow Automation</h3>
<p class="text-on-surface-variant leading-relaxed font-body">
                            From email triage to report generation, we build custom agents that handle repetitive tasks so you can focus on strategy.
                        </p>
</div>
</div>
<div class="order-1 md:order-2 relative">
<div class="w-full max-w-md mx-auto" bind:this={roboContainer}></div>
</div>
</div>
</div>
</section>

<!-- Spot Callout -->
<section class="py-24 px-8 md:px-20 bg-primary-container relative">
<div class="absolute inset-0 opacity-5">
<div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-primary to-transparent"></div>
</div>
<div class="max-w-4xl mx-auto text-center relative z-10">
<p class="font-label text-xs uppercase tracking-[0.3em] text-on-primary-container/60 mb-6">CASE STUDY</p>
<h2 class="font-headline text-4xl md:text-6xl text-on-primary-container leading-tight mb-6">
                South Carolina coalition ran 400+ events with zero scheduling errors.
            </h2>
<p class="text-on-primary-container/80 text-lg font-body mb-8 max-w-2xl mx-auto">
                Custom event automation system, Webflow integration, real-time updates across 12 partner organizations.
            </p>
<button class="border-2 border-on-primary-container text-on-primary-container px-8 py-4 font-bold hover:bg-on-primary-container hover:text-primary-container transition-all">
                View full case study
            </button>
</div>
</section>

<!-- Client Marquee -->
<section class="py-16 bg-surface-container-low overflow-hidden">
<div class="flex gap-16 items-center whitespace-nowrap animate-marquee px-8">
<span class="text-outline font-label text-sm tracking-[0.2em]">Rainey Center</span>
<span class="text-outline font-label text-sm tracking-[0.2em]">Palmetto AgriBusiness Council</span>
<span class="text-outline font-label text-sm tracking-[0.2em]">SPEAK4</span>
<span class="text-outline font-label text-sm tracking-[0.2em]">Sarah E. Hunt</span>
<span class="text-outline font-label text-sm tracking-[0.2em]">Connected Commerce Council</span>
<span class="text-outline font-label text-sm tracking-[0.2em]">Rainey Center</span>
<span class="text-outline font-label text-sm tracking-[0.2em]">Palmetto AgriBusiness Council</span>
<span class="text-outline font-label text-sm tracking-[0.2em]">SPEAK4</span>
<span class="text-outline font-label text-sm tracking-[0.2em]">Sarah E. Hunt</span>
<span class="text-outline font-label text-sm tracking-[0.2em]">Connected Commerce Council</span>
</div>
</section>

<!-- Testimonial -->
<section class="py-32 px-8 md:px-20 bg-surface">
<div class="max-w-5xl mx-auto">
<div class="mb-12">
<div class="w-16 h-1 bg-secondary mb-8"></div>
<p class="font-headline text-3xl md:text-5xl text-on-surface leading-snug italic">
                    "We needed more than a vendor. We needed a partner who understood the stakes. Raconteur delivered precision, speed, and results."
                </p>
</div>
<div class="flex items-center gap-6">
<div class="w-16 h-16 bg-primary-container flex items-center justify-center">
<span class="material-symbols-outlined text-primary text-3xl">person</span>
</div>
<div>
<p class="text-on-surface font-bold font-body text-lg">Executive Director</p>
<p class="text-outline font-label text-xs uppercase tracking-widest">South Carolina Coalition</p>
</div>
</div>
</div>
</section>

<!-- FAQ Section -->
<section id="faq" class="py-32 px-8 md:px-20 bg-surface-container-low">
<div class="max-w-4xl mx-auto">
<div class="mb-16">
<p class="font-label text-xs uppercase tracking-[0.3em] text-outline mb-4">━━ 03 QUESTIONS</p>
<h2 class="font-headline text-5xl md:text-7xl tracking-tighter text-on-surface">
                    Everything you need<br/>to know.
                </h2>
</div>
<div class="space-y-6">
<details class="group bg-surface p-6 border-l-2 border-outline-variant">
<summary class="cursor-pointer font-headline text-2xl text-on-surface list-none flex justify-between items-center">
                        What makes Raconteur different?
                        <span class="material-symbols-outlined text-outline group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p class="mt-4 text-on-surface-variant font-body leading-relaxed">
                        We combine traditional communications expertise with custom AI workflows. You're not just getting strategy or design—you're getting systems that scale.
                    </p>
</details>
<details class="group bg-surface p-6 border-l-2 border-outline-variant">
<summary class="cursor-pointer font-headline text-2xl text-on-surface list-none flex justify-between items-center">
                        Can you work with existing vendors?
                        <span class="material-symbols-outlined text-outline group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p class="mt-4 text-on-surface-variant font-body leading-relaxed">
                        Absolutely. We integrate with your current team and tools. Think of us as your force multiplier, not a replacement.
                    </p>
</details>
<details class="group bg-surface p-6 border-l-2 border-outline-variant">
<summary class="cursor-pointer font-headline text-2xl text-on-surface list-none flex justify-between items-center">
                        What industries do you serve?
                        <span class="material-symbols-outlined text-outline group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p class="mt-4 text-on-surface-variant font-body leading-relaxed">
                        We specialize in advocacy, public affairs, and high-stakes campaigns—where communication isn't just persuasion, it's power.
                    </p>
</details>
<details class="group bg-surface p-6 border-l-2 border-outline-variant">
<summary class="cursor-pointer font-headline text-2xl text-on-surface list-none flex justify-between items-center">
                        How do AI agents work?
                        <span class="material-symbols-outlined text-outline group-open:rotate-180 transition-transform">
expand_more</span>
</summary>
<p class="mt-4 text-on-surface-variant font-body leading-relaxed">
                        We build custom agents tailored to your workflow—content drafting, research monitoring, email automation. They run in the background, supervised by humans, optimized for your goals.
                    </p>
</details>
</div>
</div>
</section>

<!-- Contact Section -->
<section id="contact" class="py-32 px-8 md:px-20 bg-surface relative overflow-hidden">
<div class="absolute right-0 bottom-0 w-1/2 h-full">
<div class="w-full max-w-lg ml-auto" bind:this={spacecraftContainer}></div>
</div>
<div class="max-w-7xl mx-auto relative z-10">
<div class="max-w-2xl">
<p class="font-label text-xs uppercase tracking-[0.3em] text-outline mb-4">━━ GET IN TOUCH</p>
<h2 class="font-headline text-5xl md:text-7xl tracking-tighter text-on-surface leading-[0.9] mb-8">
                    Let's build<br/>something precise.
                </h2>
<p class="text-on-surface-variant text-xl font-body leading-relaxed mb-12">
                    Whether you need a campaign site, an AI research agent, or a complete digital overhaul—reach out. We'll respond within 24 hours.
                </p>
<form class="space-y-6">
<div class="grid md:grid-cols-2 gap-6">
<input 
                            type="text" 
                            placeholder="Your name" 
                            class="bg-surface-container border-b-2 border-outline-variant px-4 py-4 text-on-surface placeholder-outline focus:border-primary outline-none transition-colors font-body"
                        />
<input 
                            type="email" 
                            placeholder="Email address" 
                            class="bg-surface-container border-b-2 border-outline-variant px-4 py-4 text-on-surface placeholder-outline focus:border-primary outline-none transition-colors font-body"
                        />
</div>
<input 
                        type="text" 
                        placeholder="Organization" 
                        class="w-full bg-surface-container border-b-2 border-outline-variant px-4 py-4 text-on-surface placeholder-outline focus:border-primary outline-none transition-colors font-body"
                    />
<textarea 
                        placeholder="Tell us about your project" 
                        rows="5" 
                        class="w-full bg-surface-container border-b-2 border-outline-variant px-4 py-4 text-on-surface placeholder-outline focus:border-primary outline-none transition-colors font-body resize-none"
                    ></textarea>
<button 
                        type="submit" 
                        class="bg-secondary text-on-secondary px-10 py-5 text-lg font-extrabold flex items-center gap-3 hover:gap-5 transition-all w-full md:w-auto justify-center"
                    >
                        Send message <span class="material-symbols-outlined pulse-icon">send</span>
</button>
</form>
</div>
</div>
</section>

<!-- Footer -->
<footer class="bg-surface-container-highest py-16 px-8 md:px-20 border-t border-outline-variant/20">
<div class="max-w-7xl mx-auto">
<div class="grid md:grid-cols-4 gap-12 mb-12">
<div class="md:col-span-2">
<img alt="Raconteur Logo" class="h-8 w-auto mb-6" src="https://lh3.googleusercontent.com/aida/ADBb0uiqc1awPCpSVAsUlHIxSL8LG-GeNfH5gpjtaEkfZ147eU5zRrYTb1ocU3gbkOlKrD6qKnU3zfWnjtiQEZHhOKOOnmpVdgWv2QRA3xnIpHMgc7lmEvXQXmKAgFAwHzymozCUK0rv19W-LOQg4nXu__NvruM9H9wKs2GwLvart3Y6-tuy1if3D04khkRmK9PpWrAHa3I6Zvbe8C4TwB-vx7RNDF3EyH--Q5fbR3vDVmDPpQLOqn85Z37lk4EibW0PS19lSkGhlZPL220"/>
<p class="text-outline text-sm font-body leading-relaxed max-w-sm">
                        Strategic communications and AI-powered workflows for organizations that play to win.
                    </p>
</div>
<div>
<h4 class="text-on-surface font-bold mb-4 font-label text-xs uppercase tracking-widest">Services</h4>
<ul class="space-y-2">
<li><a href="#services" class="text-outline hover:text-primary transition-colors font-body text-sm">Web Design</a></li>
<li><a href="#services" class="text-outline hover:text-primary transition-colors font-body text-sm">Graphic Design</a></li>
<li><a href="#services" class="text-outline hover:text-primary transition-colors font-body text-sm">AI Agents</a></li>
<li><a href="#services" class="text-outline hover:text-primary transition-colors font-body text-sm">Consulting</a></li>
</ul>
</div>
<div>
<h4 class="text-on-surface font-bold mb-4 font-label text-xs uppercase tracking-widest">Connect</h4>
<ul class="space-y-2">
<li><a href="#contact" class="text-outline hover:text-primary transition-colors font-body text-sm">Contact</a></li>
<li><a href="#" class="text-outline hover:text-primary transition-colors font-body text-sm">LinkedIn</a></li>
<li><a href="#" class="text-outline hover:text-primary transition-colors font-body text-sm">X / Twitter</a></li>
<li><a href="#faq" class="text-outline hover:text-primary transition-colors font-body text-sm">FAQs</a></li>
</ul>
</div>
</div>
<div class="border-t border-outline-variant/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
<p class="text-outline text-xs font-label tracking-widest">© 2026 RACONTEUR CREATIVE. ALL RIGHTS RESERVED.</p>
<div class="flex gap-6">
<a href="#" class="text-outline hover:text-primary transition-colors font-label text-xs uppercase tracking-widest">Privacy</a>
<a href="#" class="text-outline hover:text-primary transition-colors font-label text-xs uppercase tracking-widest">Terms</a>
</div>
</div>
</div>
</footer>
</main>

<style>
    @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }
    .animate-marquee {
        display: flex;
        width: fit-content;
        animation: marquee 40s linear infinite;
    }
    .animate-marquee:hover {
        animation-play-state: paused;
    }

    .typing-container {
        display: inline-block;
        border-right: 3px solid var(--secondary);
        padding-right: 8px;
        animation: blink 1s step-end infinite;
    }

    @keyframes blink {
        50% { border-color: transparent; }
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
    }

    .pulse-icon {
        animation: pulse 2s ease-in-out infinite;
    }

    .noise-bg {
        background-image: 
            radial-gradient(circle at 20% 50%, rgba(173, 200, 245, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 182, 146, 0.02) 0%, transparent 50%);
        pointer-events: none;
    }
    
    /* Globe rotation on hover */
    .globe-hover:hover .material-symbols-outlined {
        animation: rotateGlobe 2s ease-in-out infinite;
    }
    
    @keyframes rotateGlobe {
        0%, 100% { transform: rotateY(0deg); }
        50% { transform: rotateY(180deg); }
    }
    
    /* Pencil scribbling motion on hover */
    .pencil-hover:hover .material-symbols-outlined {
        animation: scribble 0.6s ease-in-out infinite;
    }
    
    @keyframes scribble {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(2px, -2px) rotate(5deg); }
        50% { transform: translate(-2px, 2px) rotate(-5deg); }
        75% { transform: translate(2px, 1px) rotate(3deg); }
    }
    
    /* Checkmark building/writing animation on hover */
    .checkmark-hover:hover .material-symbols-outlined {
        animation: drawCheck 1.5s ease-in-out infinite;
    }
    
    @keyframes drawCheck {
        0% { 
            clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
        }
        50% {
            clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
        }
        100% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }
    }
</style>
