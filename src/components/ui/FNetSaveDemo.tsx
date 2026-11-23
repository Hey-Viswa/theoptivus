'use client';

import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

export type FNetDemoStepId = 1 | 2 | 3;
type PhoneScreen = 'entry' | 'activity' | 'home';
type EntryKind = 'Expense' | 'Transfer';
type ActivityFilter = 'All' | 'Expense' | 'Income' | 'Transfer';

export interface FNetSaveDemoProps {
  /** Optional extra class name for layout placement on Home or /work/fnet. */
  className?: string;
  /** Quiet header title (defaults to "How FNet saves offline"). */
  heading?: string;
  /** Semantic heading level for page outline integration (defaults to "h3"). */
  headingAs?: 'h2' | 'h3';
  /** One-line plain description beneath the heading. */
  description?: string;
  /** Resting step on mount (defaults to 1; playback never auto-starts). */
  defaultStep?: FNetDemoStepId;
}

const STEP_INTERVAL_MS = 850;
const DAILY_BUDGET_LIMIT_PAISE = 100_000; // ₹1,000.00
const SBI_INITIAL_PAISE = 840_735; // ₹8,407.35
const HDFC_INITIAL_PAISE = -1_125_000; // -₹11,250.00
const INITIAL_OUTFLOW_PAISE = 1_125_000; // -₹11,250 shown in Activity Trends
const INITIAL_NET_COUNT = 5;
const QUICK_AMOUNTS_RUPEES = [125, 45, 280] as const;

function formatIndianInteger(absRupees: number): string {
  const digits = String(Math.max(0, Math.floor(absRupees)));
  if (digits.length <= 3) return digits;
  const lastThree = digits.slice(-3);
  const rest = digits.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return `${rest},${lastThree}`;
}

function formatPaise(
  paise: number,
  options?: { spaceAfterSymbol?: boolean; showPlus?: boolean; decimals?: boolean }
): string {
  const space = options?.spaceAfterSymbol ? ' ' : '';
  const showDecimals = options?.decimals ?? true;
  const sign = paise < 0 ? '-' : options?.showPlus && paise > 0 ? '+' : '';
  const abs = Math.abs(Math.round(paise));
  const rupees = Math.floor(abs / 100);
  const rem = String(abs % 100).padStart(2, '0');
  const intPart = formatIndianInteger(rupees);
  return showDecimals ? `${sign}₹${space}${intPart}.${rem}` : `${sign}₹${space}${intPart}`;
}

function parseRupeeInputToPaise(raw: string): number {
  const cleaned = raw.replace(/[^0-9.]/g, '');
  if (!cleaned) return 0;
  const parts = cleaned.split('.');
  const intStr = parts[0] || '0';
  const decStr = (parts[1] || '').slice(0, 2).padEnd(2, '0');
  const rupees = Number.parseInt(intStr, 10);
  const paise = Number.parseInt(decStr, 10);
  if (!Number.isFinite(rupees) || !Number.isFinite(paise)) return 0;
  return Math.min(9_999_999, rupees * 100 + paise);
}

function PlayTriangleIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="w-3.5 h-3.5 shrink-0">
      <path d="M5 3.5L12.5 8L5 12.5V3.5Z" fill="currentColor" />
    </svg>
  );
}

function ReplayArrowIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="w-3.5 h-3.5 shrink-0"
    >
      <path d="M3 8a5 5 0 1 0 1.46-3.54L3 6" />
      <path d="M3 2.75V6h3.25" />
    </svg>
  );
}

function PhoneStatusGlyphs() {
  return (
    <span className="fnet-status-icons" aria-hidden="true">
      <span className="fnet-offline-chip">No signal</span>
      <svg viewBox="0 0 16 12" fill="none" className="w-3.5 h-2.5">
        <path
          d="M1.5 9.5V10.5M4.8 7.5V10.5M8.2 5.2V10.5M11.6 3V10.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.32"
        />
        <path d="M1 1.5L12.5 10.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      </svg>
      <svg viewBox="0 0 18 10" fill="none" className="w-4 h-2.5">
        <rect x="0.75" y="1.25" width="14" height="7.5" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <rect x="2" y="2.5" width="11.5" height="5" rx="1" fill="currentColor" />
        <rect x="15.5" y="3.5" width="1.75" height="3" rx="0.6" fill="currentColor" />
      </svg>
    </span>
  );
}

function M3NavIcon({
  kind,
  active,
}: {
  kind: 'home' | 'activity' | 'accounts' | 'settings';
  active?: boolean;
}) {
  const stroke = active ? '#1D274C' : '#4B4C58';
  if (kind === 'home') {
    return (
      <svg viewBox="0 0 24 24" fill={active ? stroke : 'none'} stroke={stroke} strokeWidth={1.8} aria-hidden="true">
        <path d="M4 10.2L12 3.8L20 10.2V19.2C20 19.75 19.55 20.2 19 20.2H14.5V14.2H9.5V20.2H5C4.45 20.2 4 19.75 4 19.2V10.2Z" strokeLinejoin="round" />
      </svg>
    );
  }
  if (kind === 'activity') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={1.8} aria-hidden="true">
        <path d="M6 3.5H18V20.5L15.5 18.8L13 20.5L10.5 18.8L8 20.5L6 18.8V3.5Z" strokeLinejoin="round" />
        <path d="M9 8.5H15M9 12H15M9 15.5H12.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === 'accounts') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={1.8} aria-hidden="true">
        <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
        <path d="M15.5 10.2H20.5V13.8H15.5C14.67 13.8 14 13.13 14 12.3V11.7C14 10.87 14.67 10.2 15.5 10.2Z" />
        <circle cx="16.2" cy="12" r="0.8" fill={stroke} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={1.7} aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.6.85 1 1.51 1H21a2 2 0 1 1 0 4h-.09c-.66 0-1.25.4-1.51 1Z" strokeLinejoin="round" />
    </svg>
  );
}

function DailyBudgetRing({ percent }: { percent: number }) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, percent));
  const strokeDashoffset = circumference - (clamped / 100) * circumference;

  return (
    <div className="fnet-ring-wrap" aria-hidden="true">
      <svg viewBox="0 0 60 60" className="fnet-ring-svg">
        <circle cx="30" cy="30" r={radius} className="fnet-ring-track" />
        {clamped > 0 && (
          <circle
            cx="30"
            cy="30"
            r={radius}
            className="fnet-ring-fill"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 30 30)"
          />
        )}
        <circle cx="30" cy="6" r="2.1" fill="#3B4D9B" />
      </svg>
      <span className="fnet-ring-label">{clamped}%</span>
    </div>
  );
}

export function FNetSaveDemo({
  className = '',
  heading = 'How FNet saves offline',
  headingAs = 'h3',
  description = 'One ledger command writes exact integer paise in Room before any signal returns.',
  defaultStep = 1,
}: FNetSaveDemoProps) {
  const [activeStep, setActiveStep] = useState<FNetDemoStepId>(defaultStep);
  const [screen, setScreen] = useState<PhoneScreen>('entry');
  const [entryKind, setEntryKind] = useState<EntryKind>('Expense');
  const [amountInput, setAmountInput] = useState('125');
  const [merchantInput, setMerchantInput] = useState('Transit & tea');
  const [dateChip, setDateChip] = useState<'Today' | 'Yesterday'>('Today');
  const [activityFilter, setActivityFilter] = useState<ActivityFilter>('All');
  const [committedEntry, setCommittedEntry] = useState<{
    paise: number;
    kind: EntryKind;
    merchant: string;
  } | null>(defaultStep === 3 ? { paise: 12_500, kind: 'Expense', merchant: 'Transit & tea' } : null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const timersRef = useRef<number[]>([]);
  const stepButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const titleId = useId();
  const stageId = useId();
  const amountFieldId = useId();
  const merchantFieldId = useId();

  const clearTimers = useCallback(() => {
    for (const id of timersRef.current) {
      window.clearTimeout(id);
    }
    timersRef.current = [];
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const draftPaise = useMemo(() => {
    const parsed = parseRupeeInputToPaise(amountInput);
    return parsed > 0 ? parsed : 0;
  }, [amountInput]);

  const effectivePaise = draftPaise > 0 ? draftPaise : 12_500;
  const cleanMerchant = merchantInput.trim() || (entryKind === 'Transfer' ? 'HDFC Settlement' : 'Transit & tea');

  // Derived real FNet ledger state from committed integer-paise write
  const activeDelta = committedEntry;
  const sbiBalancePaise = activeDelta ? SBI_INITIAL_PAISE - activeDelta.paise : SBI_INITIAL_PAISE;
  const hdfcBalancePaise =
    activeDelta?.kind === 'Transfer' ? HDFC_INITIAL_PAISE + activeDelta.paise : HDFC_INITIAL_PAISE;
  const spendableCashPaise = sbiBalancePaise + hdfcBalancePaise;

  const dailySpentPaise = activeDelta?.kind === 'Expense' ? activeDelta.paise : 0;
  const dailyRemainingPaise = DAILY_BUDGET_LIMIT_PAISE - dailySpentPaise;
  const dailyPct = Math.min(100, Math.round((dailySpentPaise / DAILY_BUDGET_LIMIT_PAISE) * 100));

  const outflowTotalPaise = INITIAL_OUTFLOW_PAISE + (activeDelta?.kind === 'Expense' ? activeDelta.paise : 0);
  const netCount = INITIAL_NET_COUNT + (activeDelta ? 1 : 0);

  const commitTransaction = useCallback(
    (kindOverride?: EntryKind, paiseOverride?: number, merchantOverride?: string) => {
      const k = kindOverride ?? entryKind;
      const p = paiseOverride ?? effectivePaise;
      const m = merchantOverride ?? cleanMerchant;
      setCommittedEntry({ kind: k, paise: p, merchant: m });
      setActiveStep(3);
      setScreen('activity');
    },
    [entryKind, effectivePaise, cleanMerchant]
  );

  const handlePlay = useCallback(() => {
    clearTimers();
    const targetKind = entryKind;
    const targetPaise = draftPaise > 0 ? draftPaise : 12_500;
    const targetMerchant = cleanMerchant;
    if (draftPaise <= 0) setAmountInput('125');

    const prefersReducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setHasPlayed(true);
    setCommittedEntry(null);

    if (prefersReducedMotion) {
      setIsPlaying(false);
      commitTransaction(targetKind, targetPaise, targetMerchant);
      return;
    }

    setIsPlaying(true);
    setActiveStep(1);
    setScreen('entry');

    const stepTwoTimer = window.setTimeout(() => {
      setActiveStep(2);
      setScreen('entry');
    }, STEP_INTERVAL_MS);

    const stepThreeTimer = window.setTimeout(() => {
      commitTransaction(targetKind, targetPaise, targetMerchant);
      setIsPlaying(false);
    }, STEP_INTERVAL_MS * 2);

    timersRef.current = [stepTwoTimer, stepThreeTimer];
  }, [clearTimers, entryKind, draftPaise, cleanMerchant, commitTransaction]);

  const handleReset = useCallback(() => {
    clearTimers();
    setIsPlaying(false);
    setHasPlayed(false);
    setEntryKind('Expense');
    setAmountInput('125');
    setMerchantInput('Transit & tea');
    setDateChip('Today');
    setActivityFilter('All');
    setCommittedEntry(null);
    setActiveStep(defaultStep);
    setScreen('entry');
  }, [clearTimers, defaultStep]);

  const handleSelectStep = useCallback(
    (stepId: FNetDemoStepId) => {
      clearTimers();
      setIsPlaying(false);
      setActiveStep(stepId);
      if (stepId === 1) {
        setScreen('entry');
      } else if (stepId === 2) {
        setScreen('entry');
      } else {
        setCommittedEntry({ kind: entryKind, paise: effectivePaise, merchant: cleanMerchant });
        setScreen('activity');
      }
    },
    [clearTimers, entryKind, effectivePaise, cleanMerchant]
  );

  const handleStepKeyDown = useCallback(
    (index: number, event: React.KeyboardEvent<HTMLButtonElement>) => {
      let nextIndex: number | null = null;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % 3;
      else if (event.key === 'ArrowLeft') nextIndex = (index + 2) % 3;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = 2;
      if (nextIndex === null) return;
      event.preventDefault();
      const targetStep = (nextIndex + 1) as FNetDemoStepId;
      handleSelectStep(targetStep);
      stepButtonRefs.current[nextIndex]?.focus();
    },
    [handleSelectStep]
  );

  const handlePhoneSaveClick = () => {
    if (draftPaise <= 0) return;
    clearTimers();
    setHasPlayed(true);
    const prefersReducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      commitTransaction();
      return;
    }
    setIsPlaying(true);
    setActiveStep(2);
    const done = window.setTimeout(() => {
      commitTransaction();
      setIsPlaying(false);
    }, 480);
    timersRef.current = [done];
  };

  const HeadingTag = headingAs;
  const showReset = isPlaying || hasPlayed || committedEntry !== null || activeStep !== defaultStep;
  const actionLabel = isPlaying ? 'Playing…' : hasPlayed ? 'Replay' : 'Play offline save';

  const inspectorState = useMemo(() => {
    const shownPaise = activeDelta?.paise ?? effectivePaise;
    const shownKind = activeDelta?.kind ?? entryKind;
    const shownNote = activeDelta?.merchant ?? cleanMerchant;

    if (activeStep === 1) {
      return {
        eyebrow: 'Step 01 · Local entry',
        summary: 'Queued in Material 3 Add Expense with zero network required.',
        rows: [
          { label: 'Amount', value: `${formatPaise(shownPaise)} (${shownPaise.toLocaleString('en-IN')} paise)`, mono: true },
          { label: 'Type & Account', value: `${shownKind} · SBI Spending` },
          { label: 'Merchant', value: `"${shownNote}"` },
          { label: 'Network', value: 'Offline on train · local persistence' },
        ],
        code: [
          'ADD_EXPENSE_INTENT · LOCAL',
          `type         : ${shownKind.toUpperCase()}`,
          `amount_paise : ${shownPaise}   (${formatPaise(shownPaise)} integer)`,
          `account      : SBI Spending -> ${shownKind === 'Transfer' ? 'HDFC Spending' : 'Food'}`,
        ].join('\n'),
        status: `Step 1 of 3 — Offline entry: ${formatPaise(shownPaise)} (${shownPaise.toLocaleString('en-IN')} paise) ready on SBI Spending with no signal required.`,
      };
    }

    if (activeStep === 2) {
      const hdfcDelta = shownKind === 'Transfer' ? `+${shownPaise.toLocaleString('en-IN')} paise` : 'unchanged';
      return {
        eyebrow: 'Step 02 · Atomic Room write',
        summary: 'Journal entry and account postings commit inside one Room transaction.',
        rows: [
          { label: 'Database', value: 'Room SQLite v6 · single transaction' },
          { label: 'Journal row', value: `${shownKind} · -${shownPaise.toLocaleString('en-IN')} paise`, mono: true },
          { label: 'SBI Posting', value: `-${shownPaise.toLocaleString('en-IN')} paise (SBI Spending)`, mono: true },
          { label: 'HDFC / Budget', value: shownKind === 'Transfer' ? `HDFC ${hdfcDelta} · Budget excluded` : 'Budget spent updated together', mono: true },
        ],
        code: [
          'BEGIN IMMEDIATE;',
          `  INSERT journal_entries ("${shownNote}", ${shownKind.toUpperCase()}, ${shownPaise});`,
          `  INSERT postings (sbi_spending, -${shownPaise});`,
          shownKind === 'Transfer'
            ? `  INSERT postings (hdfc_spending, +${shownPaise}); -- no income/expense inflation`
            : `  UPDATE budget_snapshot (spent_paise = spent_paise + ${shownPaise});`,
          'COMMIT;',
        ].join('\n'),
        status: `Step 2 of 3 — Room transaction: BEGIN IMMEDIATE committed journal entry and account posting for ${formatPaise(shownPaise)} atomically.`,
      };
    }

    return {
      eyebrow: 'Step 03 · Balance & Activity updated',
      summary: 'Home budget ring, Spendable Cash, and Activity update together offline.',
      rows: [
        {
          label: 'SBI Spending',
          value: `${formatPaise(SBI_INITIAL_PAISE)} -> ${formatPaise(sbiBalancePaise)}`,
          mono: true,
        },
        {
          label: shownKind === 'Transfer' ? 'Spendable Cash' : 'Daily Budget',
          value:
            shownKind === 'Transfer'
              ? `${formatPaise(spendableCashPaise)} (unchanged on transfer)`
              : `${formatPaise(DAILY_BUDGET_LIMIT_PAISE)} -> ${formatPaise(dailyRemainingPaise)} left (${dailyPct}%)`,
          mono: true,
        },
        {
          label: 'Exact integer paise',
          value: `${sbiBalancePaise.toLocaleString('en-IN')} paise on SBI`,
          mono: true,
        },
        { label: 'Cloud backup', value: 'Optional cloud sync stays deferred until online' },
      ],
      code: [
        `SBI_SPENDING    ${formatPaise(SBI_INITIAL_PAISE)} -> ${formatPaise(sbiBalancePaise)}  (${sbiBalancePaise} paise)`,
        shownKind === 'Transfer'
          ? `HDFC_SPENDING   ${formatPaise(HDFC_INITIAL_PAISE)} -> ${formatPaise(hdfcBalancePaise)}  (Transfer excluded from budget)`
          : `DAILY_BUDGET    ${formatPaise(DAILY_BUDGET_LIMIT_PAISE)} -> ${formatPaise(dailyRemainingPaise)}  (${dailyPct}% used today)`,
        `ACTIVITY_LOG    "${shownNote}" · Saved offline · Sync pending`,
      ].join('\n'),
      status: `Step 3 of 3 — Verified balance: SBI Spending updated ${formatPaise(SBI_INITIAL_PAISE)} -> ${formatPaise(sbiBalancePaise)}. Tap Home in the phone bar to inspect the Daily budget card.`,
    };
  }, [
    activeDelta,
    activeStep,
    cleanMerchant,
    dailyPct,
    dailyRemainingPaise,
    effectivePaise,
    entryKind,
    hdfcBalancePaise,
    sbiBalancePaise,
    spendableCashPaise,
  ]);

  const showTodayCommitted =
    committedEntry !== null &&
    (activityFilter === 'All' || activityFilter === committedEntry.kind);
  const showSipRow = activityFilter === 'All' || activityFilter === 'Transfer';
  const showMondayGroup = activityFilter === 'All' || activityFilter === 'Expense';

  return (
    <section aria-labelledby={titleId} className={`fnet-demo ${className}`.trim()}>
      {/* Top Toolbar Preserved for Portfolio Editorial Consistency */}
      <div className="fnet-demo-head">
        <div className="fnet-demo-intro">
          <HeadingTag id={titleId} className="fnet-demo-title">
            {heading}
          </HeadingTag>
          <p className="fnet-demo-desc">{description}</p>
        </div>

        <div className="fnet-demo-actions">
          <button
            type="button"
            onClick={handlePlay}
            disabled={isPlaying}
            aria-label={
              isPlaying
                ? 'Playing offline save sequence'
                : hasPlayed
                  ? 'Replay offline save sequence'
                  : 'Play offline save sequence'
            }
            className="fnet-demo-action"
          >
            {hasPlayed && !isPlaying ? <ReplayArrowIcon /> : <PlayTriangleIcon />}
            <span>{actionLabel}</span>
          </button>

          {showReset && (
            <button type="button" onClick={handleReset} className="fnet-demo-reset">
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Guided Step Selector */}
      <div role="group" aria-label="FNet offline save steps" className="fnet-demo-steps">
        {(
          [
            { id: 1, label: '1. Offline entry' },
            { id: 2, label: '2. Room transaction' },
            { id: 3, label: '3. Verified balance' },
          ] as const
        ).map((step, index) => {
          const isActive = step.id === activeStep;
          return (
            <button
              key={step.id}
              ref={(el) => {
                stepButtonRefs.current[index] = el;
              }}
              type="button"
              aria-pressed={isActive}
              aria-controls={stageId}
              data-step={step.id}
              data-active={isActive ? 'true' : 'false'}
              onClick={() => handleSelectStep(step.id)}
              onKeyDown={(e) => handleStepKeyDown(index, e)}
              className={`fnet-demo-step ${isActive ? 'fnet-demo-step-active' : ''}`.trim()}
            >
              {step.label}
            </button>
          );
        })}
      </div>

      {/* Synchronized Workspace: Authentic FNet Android UI + Notebook Ledger Inspector */}
      <div id={stageId} className="fnet-demo-workspace">
        {/* LEFT: Interactive Exact FNet Material 3 Phone */}
        <div className="fnet-phone-shell" aria-label="Interactive FNet Android interface">
          <div className="fnet-phone">
            {/* Android Status Bar */}
            <div className="fnet-status-bar">
              <span className="fnet-status-time">9:06</span>
              <PhoneStatusGlyphs />
            </div>

            {/* SCREEN 1: ADD EXPENSE (entry.webp) */}
            {screen === 'entry' && (
              <div className="fnet-screen fnet-screen-entry">
                <div className="fnet-appbar">
                  <button
                    type="button"
                    onClick={() => {
                      clearTimers();
                      setIsPlaying(false);
                      setScreen('home');
                    }}
                    className="fnet-icon-btn"
                    aria-label="Back to FNet Home"
                  >
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
                      <path d="M15.5 10H4.5M9.5 5L4.5 10L9.5 15" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <span className="fnet-appbar-title">
                    {entryKind === 'Transfer' ? 'Add Transfer' : 'Add Expense'}
                  </span>
                  <span className="fnet-scan-pill" title="ML Kit OCR Receipt Scan (on device)" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                      <path d="M4.5 7V5.2C4.5 4.81 4.81 4.5 5.2 4.5H7M13 4.5H14.8C15.19 4.5 15.5 4.81 15.5 5.2V7M4.5 13V14.8C4.5 15.19 4.81 15.5 5.2 15.5H7M13 15.5H14.8C15.19 15.5 15.5 15.19 15.5 14.8V13M7 10H13M7 7.8H11" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>

                {/* 4-Part M3 Segmented Pill */}
                <div className="fnet-segmented" role="group" aria-label="Entry type">
                  {(['Expense', 'Income', 'Transfer', 'EMI'] as const).map((kind) => {
                    const interactive = kind === 'Expense' || kind === 'Transfer';
                    const active = entryKind === kind;
                    return (
                      <button
                        key={kind}
                        type="button"
                        disabled={!interactive}
                        aria-pressed={active}
                        onClick={() => {
                          if (!interactive) return;
                          clearTimers();
                          setIsPlaying(false);
                          setEntryKind(kind);
                          if (kind === 'Transfer' && merchantInput === 'Transit & tea') {
                            setMerchantInput('SBI to HDFC');
                          } else if (kind === 'Expense' && merchantInput === 'SBI to HDFC') {
                            setMerchantInput('Transit & tea');
                          }
                        }}
                        className={`fnet-seg-btn ${active ? 'fnet-seg-active' : ''}`.trim()}
                      >
                        {kind}
                      </button>
                    );
                  })}
                </div>

                {/* Outlined ₹ Amount Field */}
                <div className="fnet-field-wrap">
                  <label htmlFor={amountFieldId} className="sr-only">
                    Amount in rupees
                  </label>
                  <div className="fnet-outlined-field">
                    <span className="fnet-rupee-prefix" aria-hidden="true">
                      ₹
                    </span>
                    <input
                      id={amountFieldId}
                      type="text"
                      inputMode="decimal"
                      value={amountInput}
                      onChange={(e) => {
                        clearTimers();
                        setIsPlaying(false);
                        setAmountInput(e.target.value);
                      }}
                      placeholder="Amount"
                      className="fnet-outlined-input"
                    />
                  </div>

                  <div className="fnet-quick-chips" aria-label="Sample amounts">
                    {QUICK_AMOUNTS_RUPEES.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          clearTimers();
                          setIsPlaying(false);
                          setAmountInput(String(amt));
                        }}
                        className={`fnet-mini-chip ${amountInput === String(amt) ? 'fnet-mini-chip-active' : ''}`.trim()}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Row + Today/Yesterday */}
                <div className="fnet-date-block">
                  <div className="fnet-date-row">
                    <span>Date</span>
                    <span className="fnet-date-val">20 Nov 2026</span>
                  </div>
                  <div className="fnet-chip-row">
                    {(['Today', 'Yesterday'] as const).map((day) => (
                      <button
                        key={day}
                        type="button"
                        aria-pressed={dateChip === day}
                        onClick={() => setDateChip(day)}
                        className={`fnet-choice-chip ${dateChip === day ? 'fnet-choice-chip-active' : ''}`.trim()}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Outlined Item or Merchant Field */}
                <div className="fnet-outlined-field fnet-outlined-compact">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" className="w-4 h-4 shrink-0 text-[#494A54]">
                    <path d="M5.5 3.5H14.5V16.5L12.5 15.1L10 16.5L7.5 15.1L5.5 16.5V3.5Z" strokeLinejoin="round" />
                    <path d="M8 7.5H12M8 10.5H12" strokeLinecap="round" />
                  </svg>
                  <label htmlFor={merchantFieldId} className="sr-only">
                    Item or merchant
                  </label>
                  <input
                    id={merchantFieldId}
                    type="text"
                    value={merchantInput}
                    onChange={(e) => {
                      clearTimers();
                      setIsPlaying(false);
                      setMerchantInput(e.target.value);
                    }}
                    placeholder="Item or merchant"
                    className="fnet-outlined-input"
                  />
                </div>

                {/* Tonal Category / Destination Row */}
                <div className="fnet-tonal-row">
                  <span className="fnet-tonal-badge" aria-hidden="true">
                    {entryKind === 'Transfer' ? '⇄' : 'Ψ'}
                  </span>
                  <div className="fnet-tonal-meta">
                    <span className="fnet-tonal-kicker">
                      {entryKind === 'Transfer' ? 'Destination account' : 'Category'}
                    </span>
                    <span className="fnet-tonal-title">
                      {entryKind === 'Transfer' ? 'HDFC Spending' : 'Food'}
                    </span>
                  </div>
                  <span className="fnet-tonal-trailing">Select ▾</span>
                </div>

                {/* Tonal Payment Account Row */}
                <div className="fnet-tonal-row">
                  <span className="fnet-tonal-badge fnet-tonal-badge-strong" aria-hidden="true">
                    ▣
                  </span>
                  <div className="fnet-tonal-meta">
                    <span className="fnet-tonal-kicker">Payment account</span>
                    <span className="fnet-tonal-title">SBI Spending</span>
                    <span className="fnet-tonal-sub">
                      Available: {formatPaise(sbiBalancePaise)}
                    </span>
                  </div>
                  <span className="fnet-tonal-trailing">Change ▾</span>
                </div>

                {/* Inline Room Commit Banner during Step 2 */}
                {activeStep === 2 && (
                  <div className="fnet-room-toast" role="status">
                    Writing 1 atomic Room tx ({effectivePaise.toLocaleString('en-IN')} paise)…
                  </div>
                )}

                {/* Bottom M3 Save Bar */}
                <div className="fnet-save-dock">
                  <button
                    type="button"
                    disabled={draftPaise <= 0 || isPlaying}
                    onClick={handlePhoneSaveClick}
                    className={`fnet-save-btn ${draftPaise > 0 ? 'fnet-save-ready' : ''}`.trim()}
                  >
                    {activeStep === 2 ? 'Committing Room tx…' : 'Save'}
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 2: ACTIVITY (activity.webp) */}
            {screen === 'activity' && (
              <div className="fnet-screen fnet-screen-activity">
                <div className="fnet-appbar">
                  <span className="fnet-appbar-title fnet-appbar-large">Activity</span>
                  <span className="fnet-bell-glyph" aria-hidden="true">
                    🔔
                  </span>
                </div>

                {/* Trends & Velocity Card */}
                <div className="fnet-trends-card">
                  <div className="fnet-trends-top">
                    <div>
                      <p className="fnet-trends-heading">Activity Trends &amp; Velocity</p>
                      <p className="fnet-trends-sub">
                        Avg ₹5,625/d · Top: EMI (₹11,250)
                      </p>
                    </div>
                    <span className="fnet-export-pill">Export ▾</span>
                  </div>

                  <div className="fnet-trends-metrics">
                    <div>
                      <span>Inflow</span>
                      <strong className="fnet-val-income">+₹0</strong>
                    </div>
                    <div>
                      <span>Outflow</span>
                      <strong className="fnet-val-ink">
                        -{formatPaise(outflowTotalPaise, { decimals: false })}
                      </strong>
                    </div>
                    <div>
                      <span>Net ({netCount})</span>
                      <strong className="fnet-val-error">
                        -{formatPaise(outflowTotalPaise, { decimals: false })}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Search & Filter Row */}
                <div className="fnet-search-pill" aria-hidden="true">
                  <span>⌕</span>
                  <span>Search activity</span>
                </div>

                <div className="fnet-chip-row fnet-filter-row" role="group" aria-label="Filter FNet activity">
                  {(['All', 'Expense', 'Income', 'Transfer'] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      aria-pressed={activityFilter === f}
                      onClick={() => setActivityFilter(f)}
                      className={`fnet-choice-chip ${activityFilter === f ? 'fnet-choice-chip-active' : ''}`.trim()}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                {/* Ledger Feed */}
                <div className="fnet-feed">
                  <div className="fnet-feed-group-head">
                    <span>Today</span>
                    {showTodayCommitted && committedEntry && (
                      <span className="fnet-feed-total">
                        {committedEntry.kind === 'Transfer' ? 'Transfer synced' : formatPaise(-committedEntry.paise)}
                      </span>
                    )}
                  </div>

                  {showTodayCommitted && committedEntry && (
                    <div className="fnet-feed-row fnet-feed-row-new">
                      <span
                        className={`fnet-feed-avatar ${committedEntry.kind === 'Transfer' ? 'fnet-avatar-transfer' : 'fnet-avatar-expense'}`}
                        aria-hidden="true"
                      >
                        {committedEntry.kind === 'Transfer' ? '⇄' : 'Ψ'}
                      </span>
                      <div className="fnet-feed-meta">
                        <div className="fnet-feed-title-line">
                          <strong>{committedEntry.merchant}</strong>
                          <span className="fnet-badge-pill">Offline</span>
                        </div>
                        <p>
                          {committedEntry.kind === 'Transfer'
                            ? 'SBI Spending -> HDFC Spending · Saved'
                            : 'SBI Spending · Food · Saved in Room'}
                        </p>
                      </div>
                      <span
                        className={`fnet-feed-amount ${committedEntry.kind === 'Expense' ? 'fnet-val-error' : ''}`.trim()}
                      >
                        {committedEntry.kind === 'Transfer' ? '⇄ ' : '-'}
                        {formatPaise(committedEntry.paise)}
                      </span>
                    </div>
                  )}

                  {showSipRow && (
                    <div className="fnet-feed-row">
                      <span className="fnet-feed-avatar fnet-avatar-transfer" aria-hidden="true">
                        ⇄
                      </span>
                      <div className="fnet-feed-meta">
                        <div className="fnet-feed-title-line">
                          <strong>Automated SIP</strong>
                          <span className="fnet-badge-pill">SIP</span>
                        </div>
                        <p>SBI Spending · Automated system SIP all…</p>
                      </div>
                      <span className="fnet-feed-amount">⇄ ₹600.00</span>
                    </div>
                  )}

                  {showMondayGroup && (
                    <>
                      <div className="fnet-feed-group-head fnet-feed-group-spaced">
                        <span>Monday, 16 November 2026</span>
                        <span className="fnet-feed-total">-₹11,250.00</span>
                      </div>
                      <div className="fnet-feed-row">
                        <span className="fnet-feed-avatar" aria-hidden="true">
                          ▤
                        </span>
                        <div className="fnet-feed-meta">
                          <strong>EMI</strong>
                          <p>HDFC Spending · EMI payment: HDFC C…</p>
                        </div>
                        <span className="fnet-feed-amount fnet-val-error">-₹11250.00</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Floating Extended + Add entry FAB */}
                <button
                  type="button"
                  onClick={() => {
                    clearTimers();
                    setIsPlaying(false);
                    setActiveStep(1);
                    setScreen('entry');
                  }}
                  className="fnet-fab"
                >
                  <span>+</span>
                  <span>Add entry</span>
                </button>
              </div>
            )}

            {/* SCREEN 3: HOME DASHBOARD (home.webp) */}
            {screen === 'home' && (
              <div className="fnet-screen fnet-screen-home">
                <div className="fnet-appbar">
                  <span className="fnet-appbar-title fnet-appbar-large">FNet</span>
                  <span className="fnet-bell-glyph" aria-hidden="true">
                    🔔
                  </span>
                </div>

                {/* Daily Budget Card */}
                <div className="fnet-card">
                  <div className="fnet-card-head">
                    <span className="fnet-card-icon" aria-hidden="true">
                      ◔
                    </span>
                    <span className="fnet-card-title">Daily budget</span>
                    <span className="fnet-chevron" aria-hidden="true">
                      ›
                    </span>
                  </div>

                  <div className="fnet-budget-body">
                    <div>
                      <p className="fnet-hero-amount">
                        {formatPaise(dailyRemainingPaise, { spaceAfterSymbol: true })}
                      </p>
                      <p className="fnet-accent-sub">Left today</p>
                    </div>
                    <DailyBudgetRing percent={dailyPct} />
                  </div>

                  <div className="fnet-card-foot">
                    <div>
                      <span className="fnet-muted-xs">Month fixed covered 0%</span>
                      <span className="fnet-safe-daily">Safe daily ₹1,659.09/d</span>
                    </div>
                    <span className="fnet-risk-pill">Deficit risk</span>
                  </div>
                </div>

                {/* Spendable Cash Card */}
                <div className="fnet-card">
                  <div className="fnet-card-head">
                    <span className="fnet-card-icon" aria-hidden="true">
                      ▣
                    </span>
                    <span className="fnet-card-title">Spendable Cash</span>
                    <span className="fnet-chevron" aria-hidden="true">
                      ›
                    </span>
                  </div>

                  <p className="fnet-hero-amount">
                    {formatPaise(spendableCashPaise, { spaceAfterSymbol: true })}
                  </p>

                  <div className="fnet-acct-rows">
                    <div>
                      <span>SBI Spending</span>
                      <strong>{formatPaise(sbiBalancePaise, { spaceAfterSymbol: true })}</strong>
                    </div>
                    <div>
                      <span>HDFC Spending</span>
                      <strong>{formatPaise(hdfcBalancePaise, { spaceAfterSymbol: true })}</strong>
                    </div>
                  </div>
                </div>

                {/* Portfolios & Investments Card */}
                <div className="fnet-card fnet-card-compact">
                  <div className="fnet-card-head">
                    <span className="fnet-card-icon" aria-hidden="true">
                      ↗
                    </span>
                    <span className="fnet-card-title">Portfolios &amp; Investments</span>
                    <span className="fnet-chevron" aria-hidden="true">
                      ›
                    </span>
                  </div>
                  <p className="fnet-hero-amount">₹ 1,91,092.83</p>
                  <div className="fnet-portfolio-meta">
                    <span>Book value</span>
                    <span className="fnet-accent-sub">Valuation needed</span>
                  </div>
                </div>

                {/* Floating Extended + Add entry FAB */}
                <button
                  type="button"
                  onClick={() => {
                    clearTimers();
                    setIsPlaying(false);
                    setActiveStep(1);
                    setScreen('entry');
                  }}
                  className="fnet-fab"
                >
                  <span>+</span>
                  <span>Add entry</span>
                </button>
              </div>
            )}

            {/* Shared M3 Bottom Nav on Home & Activity */}
            {screen !== 'entry' && (
              <nav className="fnet-bottom-nav" aria-label="FNet app screens">
                <button
                  type="button"
                  onClick={() => setScreen('home')}
                  aria-current={screen === 'home' ? 'page' : undefined}
                  className={`fnet-nav-item ${screen === 'home' ? 'fnet-nav-active' : ''}`.trim()}
                >
                  <span className="fnet-nav-pill">
                    <M3NavIcon kind="home" active={screen === 'home'} />
                  </span>
                  <span>Home</span>
                </button>

                <button
                  type="button"
                  onClick={() => setScreen('activity')}
                  aria-current={screen === 'activity' ? 'page' : undefined}
                  className={`fnet-nav-item ${screen === 'activity' ? 'fnet-nav-active' : ''}`.trim()}
                >
                  <span className="fnet-nav-pill">
                    <M3NavIcon kind="activity" active={screen === 'activity'} />
                  </span>
                  <span>Activity</span>
                </button>

                <span className="fnet-nav-item fnet-nav-muted" aria-hidden="true">
                  <span className="fnet-nav-pill">
                    <M3NavIcon kind="accounts" />
                  </span>
                  <span>Accounts</span>
                </span>

                <span className="fnet-nav-item fnet-nav-muted" aria-hidden="true">
                  <span className="fnet-nav-pill">
                    <M3NavIcon kind="settings" />
                  </span>
                  <span>Settings</span>
                </span>
              </nav>
            )}

            {/* Android Gesture Handle */}
            <div className="fnet-gesture-bar" aria-hidden="true" />
          </div>

          <p className="fnet-phone-hint">
            Interactive FNet UI — tap <strong>Save</strong>, toggle <strong>Expense / Transfer</strong>, or switch between <strong>Home</strong> and <strong>Activity</strong>.
          </p>
        </div>

        {/* RIGHT: Synchronized Notebook Ledger & Room Transaction Inspector */}
        <div className="fnet-demo-stage">
          <div className="fnet-demo-stage-head">
            <p>{inspectorState.eyebrow}</p>
            <p>{inspectorState.summary}</p>
          </div>

          <dl className="fnet-demo-kv">
            {inspectorState.rows.map((field) => (
              <div key={field.label} className="fnet-demo-kv-row">
                <dt>{field.label}</dt>
                <dd className={field.mono ? 'fnet-demo-kv-mono' : undefined}>{field.value}</dd>
              </div>
            ))}
          </dl>

          <pre className="fnet-demo-code">
            <code>{inspectorState.code}</code>
          </pre>

          <div aria-live="polite" aria-atomic="true" className="fnet-demo-status">
            {isPlaying
              ? `Playing step ${activeStep} of 3: ${inspectorState.status}`
              : inspectorState.status}
          </div>
        </div>
      </div>

      <p className="fnet-demo-note">
        Grounded in FNet’s Compose UI &amp; Room architecture: integer paise avoid float drift, Expense &amp; Transfer use distinct postings, and optional cloud backup stays deferred offline.
      </p>
    </section>
  );
}

export default FNetSaveDemo;
