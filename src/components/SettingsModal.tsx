import { useState, useCallback } from "react";
import { Plus, Coffee, Trash2, GripVertical, RotateCcw } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTimerStore } from "@/store";
import { defaultBlinds } from "@/store/defaults";
import type { BlindLevel } from "@/store/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsModal({ open, onOpenChange }: Props) {
  const blinds = useTimerStore((s) => s.blinds);
  const updateBlinds = useTimerStore((s) => s.updateBlinds);

  const [draft, setDraft] = useState<BlindLevel[]>([]);

  // Sync draft when opening
  const handleOpenChange = useCallback(
    (o: boolean) => {
      if (o) setDraft(blinds.map((b) => ({ ...b })));
      onOpenChange(o);
    },
    [blinds, onOpenChange]
  );

  const update = (id: string, patch: Partial<BlindLevel>) => {
    setDraft((d) => d.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  };

  const remove = (id: string) => {
    setDraft((d) => d.filter((b) => b.id !== id));
  };

  const addLevel = () => {
    const last = draft[draft.length - 1];
    setDraft((d) => [
      ...d,
      {
        id: crypto.randomUUID(),
        level: 0,
        smallBlind: last && !last.isBreak ? last.smallBlind * 2 : 100,
        bigBlind: last && !last.isBreak ? last.bigBlind * 2 : 200,
        duration: last?.duration ?? 900,
      },
    ]);
  };

  const addBreak = () => {
    setDraft((d) => [
      ...d,
      {
        id: crypto.randomUUID(),
        level: 0,
        smallBlind: 0,
        bigBlind: 0,
        duration: 600,
        isBreak: true,
      },
    ]);
  };

  const restoreDefaults = () => setDraft(defaultBlinds.map((b) => ({ ...b })));

  const save = () => {
    updateBlinds(draft);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Blind Structure</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 mt-4 max-h-[55vh] overflow-y-auto pr-1">
          {/* Header */}
          <div className="grid grid-cols-[2rem_1fr_1fr_1fr_auto_1fr_2rem] gap-2 text-xs text-muted-foreground px-1 font-medium">
            <span />
            <span>Small Blind</span>
            <span>Big Blind</span>
            <span>Ante</span>
            <span className="w-9" />
            <span>Duration</span>
            <span />
          </div>

          {draft.map((level) => (
            <div
              key={level.id}
              className="grid grid-cols-[2rem_1fr_1fr_1fr_auto_1fr_2rem] gap-2 items-center bg-secondary/50 rounded-md px-1 py-2"
            >
              <GripVertical className="h-4 w-4 text-muted-foreground" />

              {level.isBreak ? (
                <>
                  <span className="col-span-3 text-center font-medium text-yellow-500 flex items-center gap-2 justify-center">
                    <Coffee className="h-4 w-4" /> Break
                  </span>
                  <span className="w-9" />
                </>
              ) : (
                <>
                  <input
                    type="number"
                    value={level.smallBlind}
                    onChange={(e) => update(level.id, { smallBlind: +e.target.value })}
                    className="w-full bg-background border rounded px-2 py-1 text-sm tabular-nums"
                    min={0}
                  />
                  <input
                    type="number"
                    value={level.bigBlind}
                    onChange={(e) => update(level.id, { bigBlind: +e.target.value })}
                    className="w-full bg-background border rounded px-2 py-1 text-sm tabular-nums"
                    min={0}
                  />
                  <input
                    type="number"
                    value={level.ante ?? ""}
                    placeholder="—"
                    onChange={(e) =>
                      update(level.id, { ante: e.target.value ? +e.target.value : undefined })
                    }
                    className="w-full bg-background border rounded px-2 py-1 text-sm tabular-nums"
                    min={0}
                  />
                  <Switch
                    checked={level.ante != null}
                    onCheckedChange={(checked) =>
                      update(level.id, { ante: checked ? (level.bigBlind || 100) : undefined })
                    }
                    aria-label="Toggle ante"
                  />
                </>
              )}

              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={Math.floor(level.duration / 60)}
                  onChange={(e) => update(level.id, { duration: Math.max(60, +e.target.value * 60) })}
                  className="w-16 bg-background border rounded px-2 py-1 text-sm tabular-nums"
                  min={1}
                />
                <span className="text-xs text-muted-foreground">min</span>
              </div>

              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => remove(level.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={addLevel}>
              <Plus className="h-4 w-4 mr-1" /> Add Level
            </Button>
            <Button variant="outline" size="sm" onClick={addBreak}>
              <Coffee className="h-4 w-4 mr-1" /> Add Break
            </Button>
            <Button variant="outline" size="sm" onClick={restoreDefaults}>
              <RotateCcw className="h-4 w-4 mr-1" /> Restore Defaults
            </Button>
          </div>
          <Button onClick={save}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
