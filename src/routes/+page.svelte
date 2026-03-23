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
	let currentYear = new Date().getFullYear();
	
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
		const duration = 2000;
		const startTime = Date.now();
		
		function update() {
			const elapsed = Date.now() - startTime;
			const progress = Math.min(elapsed / duration, 1);
			progressValue = Math.floor(progress * 100);
			
			if (progress < 1) {
				requestAnimationFrame(update);
			}
		}
		
		update();
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
		
		// Progress animation now triggered on hover, not auto
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
			<img alt="Raconteur Logo" class="h-10 w-auto" src="/raconteur-logo.svg" />
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
						<span id="typing-text">{typingText}</span>
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
						<div class="text-on-surface-variant mb-1">... Analyzing sentiment nodes (DC_METRO_AREA)</div>
						<div class="text-on-surface-variant mb-1">... Deploying 12 agentic nodes for outreach</div>
						<div class="text-primary mb-1">... Synthesizing narrative architecture [SUCCESS]</div>
						<div class="text-on-surface-variant mb-4">... Monitoring live sentiment drift: <span class="text-secondary font-bold">+4.2%</span></div>
						<div class="text-on-surface flex items-center">
							<span class="mr-2">&gt;</span> Active monitoring engaged<span class="terminal-cursor"></span>
						</div>
					</div>
				</div>
				<div class="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/10 -z-10"></div>
			</div>
		</div>
	</section>

	<!-- Client Strip -->
	<section class="py-12 bg-surface-container-lowest overflow-hidden">
		<div class="px-8 md:px-20 mb-6">
			<span class="font-label text-[10px] uppercase tracking-[0.3em] text-outline">Trusted by</span>
		</div>
		<div class="flex gap-16 items-center">
			<!-- First set of logos -->
			<div class="flex gap-16 items-center whitespace-nowrap animate-marquee">
				<svg class="h-10 w-auto fill-current text-on-surface/40 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default"><use href="/client-logos.svg#amazon"></use></svg>
				<svg class="h-12 w-auto fill-current text-on-surface/40 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default"><use href="/client-logos.svg#aga"></use></svg>
				<svg class="h-10 w-auto fill-current text-on-surface/40 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default"><use href="/client-logos.svg#connected-commerce-council"></use></svg>
				<svg class="h-10 w-auto fill-current text-on-surface/40 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default"><use href="/client-logos.svg#data-protocol"></use></svg>
				<svg class="h-12 w-auto fill-current text-on-surface/40 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default"><use href="/client-logos.svg#glass-packaging-institute"></use></svg>
				<img src="/pabc-logo.svg" alt="Palmetto AgriBusiness Council" class="h-10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default" />
				<svg class="h-12 w-auto fill-current text-on-surface/40 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default"><use href="/client-logos.svg#punchbowl"></use></svg>
				<img src="/rainey-logo.svg" alt="The Rainey Center" class="h-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default" />
			</div>
			<!-- Duplicate set for seamless loop -->
			<div class="flex gap-16 items-center whitespace-nowrap animate-marquee" aria-hidden="true">
				<svg class="h-10 w-auto fill-current text-on-surface/40 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default"><use href="/client-logos.svg#amazon"></use></svg>
				<svg class="h-12 w-auto fill-current text-on-surface/40 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default"><use href="/client-logos.svg#aga"></use></svg>
				<svg class="h-10 w-auto fill-current text-on-surface/40 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default"><use href="/client-logos.svg#connected-commerce-council"></use></svg>
				<svg class="h-10 w-auto fill-current text-on-surface/40 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default"><use href="/client-logos.svg#data-protocol"></use></svg>
				<svg class="h-12 w-auto fill-current text-on-surface/40 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default"><use href="/client-logos.svg#glass-packaging-institute"></use></svg>
				<img src="/pabc-logo.svg" alt="Palmetto AgriBusiness Council" class="h-10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default" />
				<svg class="h-12 w-auto fill-current text-on-surface/40 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default"><use href="/client-logos.svg#punchbowl"></use></svg>
				<img src="/rainey-logo.svg" alt="The Rainey Center" class="h-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default" />
			</div>
		</div>
	</section>

	<!-- Services Section -->
	<section class="py-32 px-8 md:px-20 bg-surface" id="services">
		<div class="max-w-7xl mx-auto">
			<div class="mb-20">
				<!-- Robot Lottie Animation -->
				<div class="mb-8 w-32 h-32" bind:this={roboContainer}></div>
				<span class="font-label text-xs uppercase tracking-[0.4em] text-secondary mb-4 block">Capabilities</span>
				<h2 class="font-headline text-5xl md:text-7xl leading-tight text-on-surface max-w-2xl">AI in Every Workflow</h2>
			</div>
			<div class="grid md:grid-cols-12 gap-8">
				<!-- Service Card: Web -->
				<div class="md:col-span-4 bg-surface-container-low p-10 hover:bg-surface-container-high transition-colors group relative">
					<div class="flex justify-between items-start mb-12">
						<span class="material-symbols-outlined text-4xl text-secondary/30 group-hover:text-secondary globe-hover transition-colors">language</span>
						<span class="bg-primary/10 text-primary text-[10px] px-3 py-1 font-bold uppercase tracking-widest">AI Enhanced</span>
					</div>
					<h3 class="font-headline text-3xl text-on-surface mb-4">Web Design &amp; Development</h3>
					<p class="text-on-surface-variant font-light mb-8">Performance-first digital destinations optimized for visibility and technical authority.</p>
					<span class="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-2">arrow_right_alt</span>
				</div>
				<!-- Service Card: Advocacy -->
				<div class="md:col-span-4 bg-surface-container-low p-10 hover:bg-surface-container-high transition-colors group">
					<div class="flex justify-between items-start mb-12">
						<span class="material-symbols-outlined text-4xl text-secondary/30 group-hover:text-secondary group-hover:animate-bounce transition-colors">campaign</span>
						<span class="bg-primary/10 text-primary text-[10px] px-3 py-1 font-bold uppercase tracking-widest">AI Enhanced</span>
					</div>
					<h3 class="font-headline text-3xl text-on-surface mb-4">Advocacy Communications</h3>
					<p class="text-on-surface-variant font-light mb-8">Precision messaging designed to navigate complex regulatory and legislative landscapes.</p>
					<span class="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-2">arrow_right_alt</span>
				</div>
				<!-- Service Card: Anchor (Agentic) -->
				<div class="md:col-span-4 md:row-span-2 bg-primary-container p-12 flex flex-col justify-between border-l-4 border-secondary overflow-hidden" on:mouseenter={animateProgress}>
					<div>
						<div class="mb-8 text-secondary svg-nodes-links">
							<svg class="w-24 h-24" viewbox="0 0 100 100">
								<circle class="node" cx="50" cy="20" fill="currentColor" r="5"></circle>
								<circle class="node" cx="20" cy="50" fill="currentColor" r="5"></circle>
								<circle class="node" cx="80" cy="50" fill="currentColor" r="5"></circle>
								<circle class="node" cx="50" cy="80" fill="currentColor" r="5"></circle>
								<path class="link" d="M50 20 L20 50 L50 80 L80 50 Z" fill="none" stroke="currentColor" stroke-width="1"></path>
								<path class="link" d="M50 20 L50 80" fill="none" stroke="currentColor" stroke-width="1"></path>
								<path class="link" d="M20 50 L80 50" fill="none" stroke="currentColor" stroke-width="1"></path>
							</svg>
						</div>
						<span class="font-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-8 block">Just Released</span>
						<h3 class="font-headline text-4xl text-on-surface mb-6">Agentic Workflows</h3>
						<p class="text-on-surface-variant text-lg font-light leading-relaxed mb-8">Autonomous systems that manage communication, data synthesis, and stakeholder outreach while you sleep.</p>
					</div>
					<div class="space-y-4">
						<div class="h-1 bg-surface-dim/40 w-full"><div class="h-1 bg-secondary transition-all duration-2000" style="width: {progressValue}%"></div></div>
						<span class="font-mono text-[10px] text-primary uppercase">System efficiency: {progressValue}% optimized</span>
					</div>
				</div>
				<!-- Service Card: Graphic -->
				<div class="md:col-span-4 bg-surface-container-low p-10 hover:bg-surface-container-high transition-colors group">
					<div class="flex justify-between items-start mb-12">
						<span class="material-symbols-outlined text-4xl text-secondary/30 group-hover:text-secondary pencil-hover transition-transform">draw</span>
						<span class="bg-primary/10 text-primary text-[10px] px-3 py-1 font-bold uppercase tracking-widest">AI Enhanced</span>
					</div>
					<h3 class="font-headline text-3xl text-on-surface mb-4">Graphic Design</h3>
					<p class="text-on-surface-variant font-light mb-8">Visual identities that command respect through massive contrast and technical rigor.</p>
					<span class="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-2">arrow_right_alt</span>
				</div>
				<!-- Service Card: Audit -->
				<div class="md:col-span-4 bg-surface-container-low p-10 hover:bg-surface-container-high transition-colors group">
					<div class="flex justify-between items-start mb-12">
						<span class="material-symbols-outlined text-4xl text-secondary/30 group-hover:text-secondary checkmark-hover transition-transform">search_check</span>
						<span class="bg-primary/10 text-primary text-[10px] px-3 py-1 font-bold uppercase tracking-widest">AI Enhanced</span>
					</div>
					<h3 class="font-headline text-3xl text-on-surface mb-4">Digital Audit</h3>
					<p class="text-on-surface-variant font-light mb-8">Deep-dive technical analysis of your current digital footprint and narrative reach.</p>
					<span class="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-2">arrow_right_alt</span>
				</div>
			</div>
		</div>
	</section>

	<!-- AI Agents Deep Dive -->
	<section class="py-32 px-8 md:px-20 bg-surface-container-lowest" id="agents">
		<div class="max-w-7xl mx-auto">
			<div class="mb-20 text-right flex flex-col items-end">
				<!-- Spacecraft Lottie Animation -->
				<div class="mb-8 w-40 h-40" bind:this={spacecraftContainer}></div>
				<span class="font-label text-xs uppercase tracking-[0.4em] text-secondary mb-4 block">Specialized Capability</span>
				<h2 class="font-headline text-5xl md:text-7xl leading-tight text-on-surface">AI Agent Design, Deployment, &amp; Management</h2>
			</div>
			<div class="grid md:grid-cols-3 gap-px bg-outline-variant/20 border border-outline-variant/20">
				<!-- Agent Architecture -->
				<div class="bg-surface p-12 group hover:bg-surface-container-low transition-all">
					<div class="w-12 h-12 border border-secondary/30 flex items-center justify-center mb-8 text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-all">
						<span class="material-symbols-outlined">architecture</span>
					</div>
					<h3 class="font-headline text-3xl text-on-surface mb-4">Architecture</h3>
					<p class="text-on-surface-variant font-light mb-8">Designing the neural logic and data connectivity for specialized communication nodes.</p>
					<div class="flex flex-wrap gap-2">
						<span class="text-[9px] font-bold tracking-widest uppercase py-1 px-3 border border-outline-variant/30 text-outline">v.1.0_Llama_3</span>
						<span class="text-[9px] font-bold tracking-widest uppercase py-1 px-3 border border-outline-variant/30 text-outline">Custom_RLHF</span>
					</div>
				</div>
				<!-- Agent Development -->
				<div class="bg-surface p-12 group hover:bg-surface-container-low transition-all">
					<div class="w-12 h-12 border border-secondary/30 flex items-center justify-center mb-8 text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-all">
						<span class="material-symbols-outlined">code</span>
					</div>
					<h3 class="font-headline text-3xl text-on-surface mb-4">Development</h3>
					<p class="text-on-surface-variant font-light mb-8">Writing the custom Python and API integrations to bring autonomous logic into your tech stack.</p>
					<div class="flex flex-wrap gap-2">
						<span class="text-[9px] font-bold tracking-widest uppercase py-1 px-3 border border-outline-variant/30 text-outline">Active_Coding</span>
						<span class="text-[9px] font-bold tracking-widest uppercase py-1 px-3 border border-outline-variant/30 text-outline">API_Mesh</span>
					</div>
				</div>
				<!-- Agent Management -->
				<div class="bg-surface p-12 group hover:bg-surface-container-low transition-all">
					<div class="w-12 h-12 border border-secondary/30 flex items-center justify-center mb-8 text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-all">
						<span class="material-symbols-outlined">settings_suggest</span>
					</div>
					<h3 class="font-headline text-3xl text-on-surface mb-4">Management</h3>
					<p class="text-on-surface-variant font-light mb-8">Ongoing optimization, prompt tuning, and safety monitoring for deployed agents.</p>
					<div class="flex flex-wrap gap-2">
						<span class="text-[9px] font-bold tracking-widest uppercase py-1 px-3 border border-outline-variant/30 text-outline">Human_In_Loop</span>
						<span class="text-[9px] font-bold tracking-widest uppercase py-1 px-3 border border-outline-variant/30 text-outline">Drift_Alerts</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Testimonials -->
	<section class="py-32 px-8 md:px-20 bg-surface relative overflow-hidden">
		<div class="absolute top-1/2 left-0 -translate-y-1/2 w-full h-px bg-outline-variant/10"></div>
		<div class="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-24">
			<div class="border-l-2 border-secondary pl-12 flex flex-col gap-8">
				<p class="font-headline text-3xl md:text-4xl text-on-surface leading-tight">"They don't just deliver a website; they delivered a technical advantage that our competitors simply can't match."</p>
				<div class="flex items-center gap-4">
					<div class="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/20 overflow-hidden">
						<img alt="David Forman" class="w-full h-full object-cover" src="/davidforman.jpg" />
					</div>
					<div>
						<span class="block font-bold text-primary uppercase tracking-widest text-sm">David Forman</span>
						<span class="text-outline text-xs uppercase tracking-widest">VP Research, American Gaming Association</span>
					</div>
				</div>
			</div>
			<div class="border-l-2 border-primary/30 pl-12 flex flex-col gap-8">
				<p class="font-headline text-3xl md:text-4xl text-on-surface leading-tight">"Their ability to integrate AI into our existing advocacy workflows cut our deployment time in half while increasing impact."</p>
				<div class="flex items-center gap-4">
					<div class="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/20 overflow-hidden">
						<img alt="Rob Retzlaff" class="w-full h-full object-cover" src="/robretzlaff.jpg" />
					</div>
					<div>
						<span class="block font-bold text-primary uppercase tracking-widest text-sm">Rob Retzlaff</span>
						<span class="text-outline text-xs uppercase tracking-widest">Executive Director, Connected Commerce Council</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- FAQ Section -->
	<section class="py-32 px-8 md:px-20 bg-surface-container-low" id="faq">
		<div class="max-w-5xl mx-auto">
			<div class="mb-20">
				<div class="mb-10 w-20 h-20">
					<svg class="w-full h-full text-secondary" viewbox="0 0 100 100">
						<circle cx="50" cy="50" fill="none" opacity="0.2" r="40" stroke="currentColor" stroke-width="0.5"></circle>
						<circle cx="50" cy="50" fill="none" opacity="0.3" r="30" stroke="currentColor" stroke-width="0.5"></circle>
						<circle class="animate-pulse" cx="50" cy="50" fill="currentColor" opacity="0.8" r="15"></circle>
						<g class="animate-spin" style="transform-origin: 50% 50%; animation-duration: 10s">
							<circle cx="50" cy="10" fill="currentColor" r="3"></circle>
							<circle cx="90" cy="50" fill="currentColor" opacity="0.5" r="3"></circle>
							<circle cx="50" cy="90" fill="currentColor" opacity="0.5" r="3"></circle>
						</g>
					</svg>
				</div>
				<span class="font-label text-xs uppercase tracking-[0.4em] text-secondary mb-4 block">Common Queries</span>
				<h2 class="font-headline text-5xl text-on-surface">Intelligence &amp; Operations.</h2>
			</div>
			<div class="space-y-4">
				<details class="group bg-surface p-8 cursor-pointer border border-transparent hover:border-outline-variant/30 transition-all">
					<summary class="flex justify-between items-center font-bold text-lg text-on-surface list-none">
						What is OpenClaw?
						<span class="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
					</summary>
					<p class="mt-6 text-on-surface-variant font-light leading-relaxed max-w-3xl">OpenClaw is our proprietary internal framework for orchestrating multi-agent systems. It allows us to build specialized intelligence nodes that work together without the hallucination risks typical of standard LLM deployments.</p>
				</details>
				<details class="group bg-surface p-8 cursor-pointer border border-transparent hover:border-outline-variant/30 transition-all">
					<summary class="flex justify-between items-center font-bold text-lg text-on-surface list-none">
						Do you work with non-technical organizations?
						<span class="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
					</summary>
					<p class="mt-6 text-on-surface-variant font-light leading-relaxed max-w-3xl">Absolutely. Our role is to act as the technical bridge. We translate complex organizational goals into automated advocacy and communication workflows, regardless of your current technical maturity.</p>
				</details>
				<details class="group bg-surface p-8 cursor-pointer border border-transparent hover:border-outline-variant/30 transition-all">
					<summary class="flex justify-between items-center font-bold text-lg text-on-surface list-none">
						What is the typical deployment timeline?
						<span class="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
					</summary>
					<p class="mt-6 text-on-surface-variant font-light leading-relaxed max-w-3xl">Standard digital projects move in 6-8 week sprints. Custom agentic architectures typically require a 12-week runway from initial discovery to live production management.</p>
				</details>
			</div>
		</div>
	</section>

	<!-- Contact Section -->
	<section class="py-32 px-8 md:px-20 bg-surface border-t border-outline-variant/10" id="contact">
		<div class="max-w-7xl mx-auto">
			<div class="grid md:grid-cols-2 gap-24">
				<div>
					<span class="font-label text-xs uppercase tracking-[0.4em] text-secondary mb-4 block">New Projects</span>
					<h2 class="font-headline text-5xl md:text-7xl leading-tight text-on-surface mb-12">Let's work together.</h2>
					<div class="space-y-10">
						<div class="flex items-start gap-6">
							<span class="material-symbols-outlined text-secondary mt-1">mail</span>
							<div>
								<span class="block text-xs uppercase font-bold tracking-widest text-outline mb-1">Direct Communication</span>
								<a class="text-2xl font-headline hover:text-primary transition-colors" href="mailto:hello@raconteurcreative.com">hello@raconteurcreative.com</a>
							</div>
						</div>
						<div class="flex items-start gap-6">
							<span class="material-symbols-outlined text-secondary mt-1">location_on</span>
							<div>
								<span class="block text-xs uppercase font-bold tracking-widest text-outline mb-1">HQ</span>
								<p class="text-xl font-light">Washington, DC</p>
							</div>
						</div>
					</div>
				</div>
				<form class="bg-surface-container-low p-10 md:p-16 space-y-8 border-l-4 border-secondary">
					<div class="grid md:grid-cols-2 gap-8">
						<div class="flex flex-col gap-2">
							<label class="text-[10px] uppercase font-bold tracking-widest text-outline">Full Name</label>
							<input class="bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-secondary transition-colors py-4 text-on-surface" placeholder="John Doe" type="text" />
						</div>
						<div class="flex flex-col gap-2">
							<label class="text-[10px] uppercase font-bold tracking-widest text-outline">Organization</label>
							<input class="bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-secondary transition-colors py-4 text-on-surface" placeholder="Inc." type="text" />
						</div>
					</div>
					<div class="flex flex-col gap-2">
						<label class="text-[10px] uppercase font-bold tracking-widest text-outline">Email Address</label>
						<input class="bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-secondary transition-colors py-4 text-on-surface" placeholder="john@example.com" type="email" />
					</div>
					<div class="flex flex-col gap-2">
						<label class="text-[10px] uppercase font-bold tracking-widest text-outline">Project Description</label>
						<textarea class="bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-secondary transition-colors py-4 text-on-surface resize-none" placeholder="How can AI solve your narrative challenges?" rows="4"></textarea>
					</div>
					<button class="w-full bg-secondary text-on-secondary py-6 font-extrabold text-xl uppercase tracking-tighter hover:opacity-95 transition-opacity flex items-center justify-center gap-4">
						Submit Inquiry <span class="material-symbols-outlined pulse-icon">send</span>
					</button>
				</form>
			</div>
		</div>
	</section>
</main>

<footer class="bg-surface-container-lowest border-t border-outline-variant/15">
	<div class="flex flex-col md:flex-row justify-between items-center px-12 py-10 w-full max-w-full mx-auto">
		<div class="flex flex-col md:flex-row items-center gap-8 mb-8 md:mb-0">
			<img alt="Raconteur" class="h-6 w-auto" src="/raconteur-logo.svg" />
			<span class="font-inter text-[10px] uppercase tracking-[0.2em] text-outline">© {currentYear} Raconteur Creative</span>
		</div>
		<div class="flex gap-8">
			<a class="font-inter text-[10px] uppercase tracking-[0.2em] text-outline hover:text-primary transition-colors" href="#">LinkedIn</a>
			<a class="font-inter text-[10px] uppercase tracking-[0.2em] text-outline hover:text-primary transition-colors" href="#">X / Twitter</a>
			<a class="font-inter text-[10px] uppercase tracking-[0.2em] text-outline hover:text-primary transition-colors" href="#faq">FAQs</a>
		</div>
	</div>
</footer>

<style>
	:global(body) {
		font-family: 'Manrope', sans-serif;
		background-color: #121416;
		color: #e2e2e5;
		overflow-x: hidden;
	}
	:global(.font-serif-display) { font-family: 'DM Serif Display', serif; }
	:global(.font-inter) { font-family: 'Inter', sans-serif; }
	:global(.material-symbols-outlined) {
		font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
		vertical-align: middle;
	}
	.terminal-cursor {
		display: inline-block;
		width: 8px;
		height: 18px;
		background-color: #E8650A;
		margin-left: 4px;
		animation: blink 1s step-end infinite;
	}
	@keyframes blink { 50% { opacity: 0; } }
	:global(.noise-bg) {
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
		opacity: 0.05;
		pointer-events: none;
	}
	
	/* Typing Headline Animation */
	.typing-container {
		display: inline-flex;
		align-items: center;
		background-color: #E8650A;
		color: #000000;
		padding: 0 0.182em; /* Reduced height by 9%: 0.2 * 0.91 = 0.182 */
		transform: rotate(-1deg);
		white-space: nowrap;
	}
	#typing-text::after {
		content: '';
		display: inline-block;
		width: 0.1em;
		height: 1em;
		background-color: currentColor;
		margin-left: 2px;
		animation: blink 0.7s infinite;
	}

	/* SVG Animations */
	:global(.svg-technical-robot .head) { animation: head-float 4s ease-in-out infinite; }
	:global(.svg-technical-robot .eye) { animation: eye-blink 5s infinite; }
	:global(.svg-technical-robot .arm-r) { transform-origin: 30% 40%; animation: arm-wave 3s ease-in-out infinite; }
	@keyframes head-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
	@keyframes eye-blink { 0%, 90%, 100% { transform: scaleY(1); } 95% { transform: scaleY(0); } }
	@keyframes arm-wave { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(-15deg); } }

	:global(.svg-nodes-links .node) { animation: node-pulse 3s ease-in-out infinite; }
	:global(.svg-nodes-links .link) { stroke-dasharray: 100; stroke-dashoffset: 100; animation: link-draw 6s linear infinite; }
	@keyframes node-pulse { 0%, 100% { r: 4; opacity: 0.5; } 50% { r: 6; opacity: 1; } }
	@keyframes link-draw { 0% { stroke-dashoffset: 200; } 100% { stroke-dashoffset: 0; } }

	:global(.svg-spacecraft .flame) { animation: flame-flicker 0.1s infinite alternate; }
	:global(.svg-spacecraft .ship) { animation: ship-drift 4s ease-in-out infinite; }
	@keyframes flame-flicker { from { transform: scaleY(0.8); opacity: 0.7; } to { transform: scaleY(1.2); opacity: 1; } }
	@keyframes ship-drift { 0%, 100% { transform: translate(0,0) rotate(0deg); } 50% { transform: translate(5px, -10px) rotate(2deg); } }

	/* Kinetic Icons */
	:global(.pulse-icon) { animation: icon-pulse 2s infinite; }
	@keyframes icon-pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }

	/* Service Card Icon Animations */
	.globe-hover:hover {
		animation: globe-rotate 2s linear infinite;
	}
	@keyframes globe-rotate {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	.pencil-hover:hover {
		animation: pencil-scribble 0.5s ease-in-out infinite;
	}
	@keyframes pencil-scribble {
		0%, 100% { transform: translate(0, 0) rotate(0deg); }
		25% { transform: translate(-2px, 2px) rotate(-5deg); }
		50% { transform: translate(2px, -2px) rotate(5deg); }
		75% { transform: translate(-2px, -2px) rotate(-3deg); }
	}

	.checkmark-hover:hover {
		animation: checkmark-draw 1.5s ease-in-out;
	}
	@keyframes checkmark-draw {
		0% { 
			opacity: 0;
			transform: scale(0) rotate(-45deg);
		}
		60% { 
			opacity: 1;
			transform: scale(1.1) rotate(0deg);
		}
		100% { 
			opacity: 1;
			transform: scale(1) rotate(0deg);
		}
	}

	/* Marquee Animation */
	@keyframes marquee {
		0% { transform: translateX(0); }
		100% { transform: translateX(-50%); }
	}
	:global(.animate-marquee) {
		display: flex;
		width: fit-content;
		animation: marquee 40s linear infinite;
	}
	:global(.animate-marquee:hover) {
		animation-play-state: paused;
	}
</style>
