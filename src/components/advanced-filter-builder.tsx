"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, X, Filter, Zap, Database, Code, 
  ChevronDown, ChevronUp, Save, Trash2,
  Brackets, Copy, RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterCondition {
  id: string;
  field: string;
  operator: string;
  value: any;
  valueType: 'text' | 'number' | 'date' | 'select' | 'multiselect';
}

interface FilterGroup {
  id: string;
  operator: 'AND' | 'OR';
  conditions: FilterCondition[];
  groups: FilterGroup[];
}

interface AdvancedFilterBuilderProps {
  fields: {
    name: string;
    label: string;
    type: 'text' | 'number' | 'date' | 'select' | 'multiselect';
    options?: { value: string; label: string }[];
  }[];
  onApply: (filter: FilterGroup) => void;
  onSave?: (name: string, filter: FilterGroup) => void;
  savedFilters?: { id: string; name: string; filter: FilterGroup }[];
  className?: string;
}

const OPERATORS = {
  text: [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Not Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'not_contains', label: 'Does Not Contain' },
    { value: 'starts_with', label: 'Starts With' },
    { value: 'ends_with', label: 'Ends With' },
    { value: 'is_empty', label: 'Is Empty' },
    { value: 'is_not_empty', label: 'Is Not Empty' }
  ],
  number: [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Not Equals' },
    { value: 'greater_than', label: 'Greater Than' },
    { value: 'less_than', label: 'Less Than' },
    { value: 'greater_or_equal', label: 'Greater or Equal' },
    { value: 'less_or_equal', label: 'Less or Equal' },
    { value: 'between', label: 'Between' },
    { value: 'is_empty', label: 'Is Empty' },
    { value: 'is_not_empty', label: 'Is Not Empty' }
  ],
  date: [
    { value: 'equals', label: 'On' },
    { value: 'before', label: 'Before' },
    { value: 'after', label: 'After' },
    { value: 'between', label: 'Between' },
    { value: 'in_last', label: 'In Last' },
    { value: 'in_next', label: 'In Next' },
    { value: 'is_empty', label: 'Is Empty' },
    { value: 'is_not_empty', label: 'Is Not Empty' }
  ],
  select: [
    { value: 'equals', label: 'Is' },
    { value: 'not_equals', label: 'Is Not' },
    { value: 'in', label: 'Is Any Of' },
    { value: 'not_in', label: 'Is None Of' },
    { value: 'is_empty', label: 'Is Empty' },
    { value: 'is_not_empty', label: 'Is Not Empty' }
  ]
};

export function AdvancedFilterBuilder({
  fields,
  onApply,
  onSave,
  savedFilters = [],
  className
}: AdvancedFilterBuilderProps) {
  const [filterGroup, setFilterGroup] = useState<FilterGroup>({
    id: Date.now().toString(),
    operator: 'AND',
    conditions: [],
    groups: []
  });
  const [showSQL, setShowSQL] = useState(false);
  const [filterName, setFilterName] = useState('');

  const addCondition = (groupId: string) => {
    if (fields.length === 0) return;
    
    const firstField = fields[0];
    if (!firstField) return;
    
    const newCondition: FilterCondition = {
      id: Date.now().toString(),
      field: firstField.name,
      operator: 'equals',
      value: '',
      valueType: firstField.type
    };

    const updateGroup = (group: FilterGroup): FilterGroup => {
      if (group.id === groupId) {
        return {
          ...group,
          conditions: [...group.conditions, newCondition]
        };
      }
      return {
        ...group,
        groups: group.groups.map(updateGroup)
      };
    };

    setFilterGroup(updateGroup(filterGroup));
  };

  const addGroup = (parentGroupId: string) => {
    const newGroup: FilterGroup = {
      id: Date.now().toString(),
      operator: 'AND',
      conditions: [],
      groups: []
    };

    const updateGroup = (group: FilterGroup): FilterGroup => {
      if (group.id === parentGroupId) {
        return {
          ...group,
          groups: [...group.groups, newGroup]
        };
      }
      return {
        ...group,
        groups: group.groups.map(updateGroup)
      };
    };

    setFilterGroup(updateGroup(filterGroup));
  };

  const updateCondition = (groupId: string, conditionId: string, updates: Partial<FilterCondition>) => {
    const updateGroup = (group: FilterGroup): FilterGroup => {
      if (group.id === groupId) {
        return {
          ...group,
          conditions: group.conditions.map(condition =>
            condition.id === conditionId
              ? { ...condition, ...updates }
              : condition
          )
        };
      }
      return {
        ...group,
        groups: group.groups.map(updateGroup)
      };
    };

    setFilterGroup(updateGroup(filterGroup));
  };

  const removeCondition = (groupId: string, conditionId: string) => {
    const updateGroup = (group: FilterGroup): FilterGroup => {
      if (group.id === groupId) {
        return {
          ...group,
          conditions: group.conditions.filter(c => c.id !== conditionId)
        };
      }
      return {
        ...group,
        groups: group.groups.map(updateGroup)
      };
    };

    setFilterGroup(updateGroup(filterGroup));
  };

  const removeGroup = (parentGroupId: string, groupId: string) => {
    const updateGroup = (group: FilterGroup): FilterGroup => {
      if (group.id === parentGroupId) {
        return {
          ...group,
          groups: group.groups.filter(g => g.id !== groupId)
        };
      }
      return {
        ...group,
        groups: group.groups.map(updateGroup)
      };
    };

    setFilterGroup(updateGroup(filterGroup));
  };

  const updateGroupOperator = (groupId: string, operator: 'AND' | 'OR') => {
    const updateGroup = (group: FilterGroup): FilterGroup => {
      if (group.id === groupId) {
        return { ...group, operator };
      }
      return {
        ...group,
        groups: group.groups.map(updateGroup)
      };
    };

    setFilterGroup(updateGroup(filterGroup));
  };

  const generateSQL = (group: FilterGroup): string => {
    const conditions = group.conditions.map(condition => {
      const field = condition.field;
      const operator = condition.operator;
      const value = condition.value;

      switch (operator) {
        case 'equals': return `${field} = '${value}'`;
        case 'not_equals': return `${field} != '${value}'`;
        case 'contains': return `${field} LIKE '%${value}%'`;
        case 'not_contains': return `${field} NOT LIKE '%${value}%'`;
        case 'starts_with': return `${field} LIKE '${value}%'`;
        case 'ends_with': return `${field} LIKE '%${value}'`;
        case 'greater_than': return `${field} > ${value}`;
        case 'less_than': return `${field} < ${value}`;
        case 'greater_or_equal': return `${field} >= ${value}`;
        case 'less_or_equal': return `${field} <= ${value}`;
        case 'between': return `${field} BETWEEN ${value[0]} AND ${value[1]}`;
        case 'is_empty': return `${field} IS NULL OR ${field} = ''`;
        case 'is_not_empty': return `${field} IS NOT NULL AND ${field} != ''`;
        case 'in': return `${field} IN (${value.map((v: string) => `'${v}'`).join(', ')})`;
        case 'not_in': return `${field} NOT IN (${value.map((v: string) => `'${v}'`).join(', ')})`;
        default: return '';
      }
    });

    const groupSQL = group.groups.map(g => `(${generateSQL(g)})`);
    const allConditions = [...conditions, ...groupSQL].filter(Boolean);

    return allConditions.length > 0 
      ? allConditions.join(` ${group.operator} `)
      : '';
  };

  const renderCondition = (condition: FilterCondition, groupId: string) => {
    const field = fields.find(f => f.name === condition.field);
    const operators = field ? OPERATORS[field.type as keyof typeof OPERATORS] || OPERATORS.text : OPERATORS.text;

    return (
      <div key={condition.id} className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
        <Select
          value={condition.field}
          onValueChange={(value) => {
            const newField = fields.find(f => f.name === value);
            updateCondition(groupId, condition.id, { 
              field: value, 
              valueType: newField?.type || 'text',
              operator: 'equals',
              value: ''
            });
          }}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fields.map(field => (
              <SelectItem key={field.name} value={field.name}>
                {field.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={condition.operator}
          onValueChange={(value) => updateCondition(groupId, condition.id, { operator: value })}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {operators.map(op => (
              <SelectItem key={op.value} value={op.value}>
                {op.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {!['is_empty', 'is_not_empty'].includes(condition.operator) && (
          <>
            {condition.operator === 'between' ? (
              <div className="flex items-center gap-2">
                <Input
                  type={condition.valueType === 'number' ? 'number' : 'text'}
                  value={condition.value?.[0] || ''}
                  onChange={(e) => updateCondition(groupId, condition.id, { 
                    value: [e.target.value, condition.value?.[1] || ''] 
                  })}
                  className="w-[100px]"
                  placeholder="From"
                />
                <span className="text-muted-foreground">to</span>
                <Input
                  type={condition.valueType === 'number' ? 'number' : 'text'}
                  value={condition.value?.[1] || ''}
                  onChange={(e) => updateCondition(groupId, condition.id, { 
                    value: [condition.value?.[0] || '', e.target.value] 
                  })}
                  className="w-[100px]"
                  placeholder="To"
                />
              </div>
            ) : field?.type === 'select' ? (
              <Select
                value={condition.value}
                onValueChange={(value) => updateCondition(groupId, condition.id, { value })}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select value" />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type={condition.valueType === 'number' ? 'number' : condition.valueType === 'date' ? 'date' : 'text'}
                value={condition.value}
                onChange={(e) => updateCondition(groupId, condition.id, { value: e.target.value })}
                className="w-[150px]"
                placeholder="Value"
              />
            )}
          </>
        )}

        <Button
          size="icon"
          variant="ghost"
          onClick={() => removeCondition(groupId, condition.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  const renderGroup = (group: FilterGroup, parentGroupId?: string, depth = 0) => {
    return (
      <div key={group.id} className={cn(
        "border rounded-lg p-3",
        depth > 0 && "ml-8 mt-2"
      )}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Select
              value={group.operator}
              onValueChange={(value: 'AND' | 'OR') => updateGroupOperator(group.id, value)}
            >
              <SelectTrigger className="w-[100px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AND">AND</SelectItem>
                <SelectItem value="OR">OR</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="outline" className="text-xs">
              {group.conditions.length + group.groups.length} conditions
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => addCondition(group.id)}
            >
              <Plus className="h-3 w-3 mr-1" />
              Condition
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => addGroup(group.id)}
            >
              <Brackets className="h-3 w-3 mr-1" />
              Group
            </Button>
            {parentGroupId && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => removeGroup(parentGroupId, group.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {group.conditions.map(condition => renderCondition(condition, group.id))}
          {group.groups.map(subGroup => renderGroup(subGroup, group.id, depth + 1))}
        </div>
      </div>
    );
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Advanced Filter Builder
        </CardTitle>
        <CardDescription>
          Create complex filters using Boolean logic (AND/OR)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {savedFilters.length > 0 && (
          <div className="space-y-2">
            <Label>Quick Filters</Label>
            <div className="flex flex-wrap gap-2">
              {savedFilters.map(saved => (
                <Button
                  key={saved.id}
                  size="sm"
                  variant="outline"
                  onClick={() => setFilterGroup(saved.filter)}
                >
                  {saved.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          {renderGroup(filterGroup)}
        </div>

        {filterGroup.conditions.length === 0 && filterGroup.groups.length === 0 && (
          <div className="text-center py-8 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground mb-3">No filters added yet</p>
            <Button onClick={() => addCondition(filterGroup.id)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Condition
            </Button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Switch
              checked={showSQL}
              onCheckedChange={setShowSQL}
            />
            <Label className="text-sm">Show SQL</Label>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setFilterGroup({
                id: Date.now().toString(),
                operator: 'AND',
                conditions: [],
                groups: []
              })}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            {onSave && (
              <div className="flex items-center gap-2">
                <Input
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  placeholder="Filter name"
                  className="w-[150px]"
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    if (filterName) {
                      onSave(filterName, filterGroup);
                      setFilterName('');
                    }
                  }}
                  disabled={!filterName}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            )}
            <Button onClick={() => onApply(filterGroup)}>
              <Zap className="h-4 w-4 mr-2" />
              Apply Filter
            </Button>
          </div>
        </div>

        {showSQL && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <Label>Generated SQL</Label>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  navigator.clipboard.writeText(generateSQL(filterGroup));
                }}
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </div>
            <pre className="p-3 bg-muted rounded-lg text-sm overflow-x-auto">
              <code>{generateSQL(filterGroup) || 'No conditions defined'}</code>
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}