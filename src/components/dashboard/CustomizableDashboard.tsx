import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Plus, Grid, Layout, Settings } from 'lucide-react';
import type { WidgetConfig } from './DashboardWidget';

interface CustomizableDashboardProps {
  title: string;
  description?: string;
  availableWidgets: WidgetConfig[];
  onAddWidget: (widget: WidgetConfig) => void;
  onRemoveWidget: (widgetId: string) => void;
  onUpdateWidget: (widgetId: string, config: Partial<WidgetConfig>) => void;
  children: React.ReactNode;
}

export const CustomizableDashboard = ({
  title,
  description,
  availableWidgets,
  onAddWidget,
  onRemoveWidget,
  onUpdateWidget,
  children
}: CustomizableDashboardProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showWidgetSelector, setShowWidgetSelector] = useState(false);

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          {description && (
            <p className="text-[var(--muted-foreground)] mt-1">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant={isEditMode ? 'contained' : 'outline'}
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? <Layout size={16} className="mr-2" /> : <Settings size={16} className="mr-2" />}
            {isEditMode ? 'Exit Edit' : 'Customize'}
          </Button>

          {isEditMode && (
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowWidgetSelector(!showWidgetSelector)}
              >
                <Plus size={16} className="mr-2" />
                Add Widget
              </Button>

              {showWidgetSelector && (
                <Card className="absolute right-0 top-full mt-2 w-64 p-4 z-50">
                  <h4 className="font-semibold mb-3">Available Widgets</h4>
                  <div className="space-y-2">
                    {availableWidgets.map((widget) => (
                      <button
                        key={widget.id}
                        onClick={() => {
                          onAddWidget(widget);
                          setShowWidgetSelector(false);
                        }}
                        className="w-full text-left p-2 rounded-md hover:bg-[var(--muted)] transition-colors"
                      >
                        <div className="font-medium">{widget.title}</div>
                        <div className="text-sm text-[var(--muted-foreground)] capitalize">
                          {widget.type} • {widget.size}
                        </div>
                      </button>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 ${
        isEditMode ? 'dashboard-edit-mode' : ''
      }`}>
        {children}
      </div>

      {/* Edit Mode Overlay */}
      {isEditMode && (
        <div className="fixed inset-0 bg-black/20 z-40 pointer-events-none" />
      )}
    </div>
  );
};