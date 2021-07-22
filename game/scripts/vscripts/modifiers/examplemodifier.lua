examplemodifier = examplemodifier or class({})

-- check out https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/API

-- The modifier Tooltip is inside resource/addon_english.txt (Have fun playing)


function examplemodifier:GetTexture() return "cascading_arcana" end -- get the icon from a different ability

function examplemodifier:IsPermanent() return true end
function examplemodifier:RemoveOnDeath() return false end
function examplemodifier:IsHidden() return self:GetStackCount() == 0 end 	-- we can hide the modifier
function examplemodifier:IsDebuff() return false end 	-- make it red or green

function examplemodifier:GetAttributes()
	return 0
		+ MODIFIER_ATTRIBUTE_PERMANENT           -- Modifier passively remains until strictly removed. 
		-- + MODIFIER_ATTRIBUTE_MULTIPLE            -- Allows modifier to stack with itself. 
		-- + MODIFIER_ATTRIBUTE_IGNORE_INVULNERABLE -- Allows modifier to be assigned to invulnerable entities. 
end

function examplemodifier:DeclareFunctions()
	return {
		MODIFIER_EVENT_ON_TAKEDAMAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end


function examplemodifier:OnTakeDamage(kv)
	if IsClient() then return end
	
	if kv.attacker:GetPlayerOwnerID() == self:GetParent():GetPlayerOwnerID() and kv.attacker ~= self:GetParent() then
		self:SetStackCount(self:GetStackCount() + BUTTINGS.SPELL_AMP_INCREASE)
	elseif kv.attacker == self:GetParent() and kv.damage_category ~= DOTA_DAMAGE_CATEGORY_ATTACK then
		self:SetStackCount(self:GetStackCount() + BUTTINGS.SPELL_AMP_INCREASE)
	end
end

function examplemodifier:GetModifierSpellAmplify_Percentage()
	return self:GetStackCount()
end
